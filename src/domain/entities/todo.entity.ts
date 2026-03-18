export class TodoEntity {
    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date | null,
    ) { }

    get isCompleted() {
        return !!this.completedAt;
    }

    public static fromObject(object: { [key: string]: any }): TodoEntity {
        const { id, text, completedAt } = object;
        if (!id || !text) {
            throw new Error('Missing id or text');
        }
        let newCompletedAt;
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (isNaN(newCompletedAt.getTime())) {
                throw new Error('Invalid completedAt');
            }
        }
        return new TodoEntity(id, text, newCompletedAt);
    }
}