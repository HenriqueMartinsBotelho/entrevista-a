type AsyncWorkFunction = () => Promise<number>;

const generateWorkload = (): AsyncWorkFunction[] => {
    return Array.from({ length: 50 }, (): AsyncWorkFunction => {
        const delay: number = Math.floor(Math.random() * 1000);
        return async (): Promise<number> => {
            return new Promise<number>((resolve) =>
                setTimeout(() => resolve(delay), delay),
            );
        };
    });
};

const executeWithThrottling = async (
    maxConcurrentTasks: number,
    tasks: AsyncWorkFunction[],
): Promise<number[]> => {
    const results: number[] = [];
    const activeTasks = new Set<Promise<void>>();
    let taskIndex = 0;

    const executeTask = (task: AsyncWorkFunction) => {
        const taskPromise = task()
            .then((result) => {
                results.push(result);
            })
            .finally(() => {
                activeTasks.delete(taskPromise);
            });
        activeTasks.add(taskPromise);
    };

    while (taskIndex < tasks.length || activeTasks.size > 0) {
        if (activeTasks.size < maxConcurrentTasks && taskIndex < tasks.length) {
            executeTask(tasks[taskIndex]);
            taskIndex++;
        } else {
            await Promise.race(activeTasks);
        }
    }

    return results;
};

const main = async (): Promise<void> => {
    const startTime: number = Date.now();
    const load: AsyncWorkFunction[] = generateWorkload();

    try {
        const maxConcurrentTasks = 12;
        const results: number[] = await executeWithThrottling(
            maxConcurrentTasks,
            load,
        );
        const endTime: number = Date.now();
        console.log(`Execução completada em ${endTime - startTime}ms`);
        console.log(`Resultados: ${results}`);
    } catch (error) {
        console.error("Falha na execução:", error);
    }
};

main().catch(console.error);
