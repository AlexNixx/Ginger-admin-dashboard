export const getOptions = <T extends { name: string; _id: string }>(
    items: T[]
) => {
    return items.map((item: T) => ({
        label: item.name,
        value: item._id
    }))
}