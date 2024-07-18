// Generate unique id for each topic
export function* generatorOfIds(id = 0) {
    while (true) {
        yield id++;

    }
}

// Convert Int minutes to hr mins. 
export function durationStr(
    time,
) {
    return `${Math.floor(time / 60)} hr ${Math.floor(time % 60)} min`
}

// Search from list based on id and return index
export function search(jsTopics, id) {
    for (let topic of jsTopics) {

        id = +id
        if (topic.id === id)
            return jsTopics.indexOf(topic)
    }
    return -1
}
