export type EmptyList = readonly []

export type NonEmptyList<T> = readonly [NonNullable<T>, ...NonNullable<T>[]]

export type List<T> = EmptyList | NonEmptyList<T>

export function elementsIn<T>(array: List<T>): array is NonEmptyList<T> {
    return array.length > 0
}

type ListPredicate<T> = (item: NonNullable<T>, index: number) => boolean

export function filter<T>(array: List<T>, predicate: ListPredicate<T>) {
    if (!elementsIn(array)) return array

    const result = []
    let index = 0

    for (const item of array) {
        if (predicate(item, index)) result.push(item)

        index++
    }

    return result as unknown as List<T>
}

export function map<T, U>(array: NonEmptyList<T>, callback: (item: NonNullable<T>, index: number) => NonNullable<U>) {
    const result = []
    let index = 0

    for (const item of array) {
        result.push(callback(item, index))
        index++
    }

    return result as unknown as NonEmptyList<U>
}

export function merge<T>(...lists: Array<NonEmptyList<T>>) {
    return lists.flat(1) as unknown as NonEmptyList<T>
}
