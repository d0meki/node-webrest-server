


export class UpdateTodoDto {
    constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ) { }
    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.text) returnObj.text = this.text;
        if (this.completedAt) returnObj.completedAt = this.completedAt;
        return returnObj;
    }
    static create(props: { [key: string]: any }): [string | undefined, UpdateTodoDto | undefined] {

        const { id, text, completedAt } = props;
        let newCompletedAt = completedAt;
        if (!id || isNaN(Number(id))) {
            return ['Id property is not a number', undefined];
        }
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (isNaN(newCompletedAt.getTime())) {
                return ['CompletedAt property is not a valid date', undefined];
            }
        }
        if (!text) return ['Text property is required', undefined];

        return [undefined, new UpdateTodoDto(Number(id), text, newCompletedAt)];

    }
}