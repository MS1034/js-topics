import { fetchTopicsFromAPI, updateVisibilityInAPI, createTopicInAPI, updateTopicInAPI, deleteTopicByIdInAPI } from './api.js';
import { durationStr, search } from './utils.js';

// GLOBALS
// let jsTopics = []
let editedRow = null;
let topicsList = []


// return string of table rows generated
function renderTableRows(
    topics,
    table,
    visibility
) {
    let html = ""
    topics.forEach((topic) => {
        html = renderObject(topic, visibility)
        table.querySelector('tbody').insertAdjacentHTML('beforeend', html)
        bindEventsWithRow(topic.id)
    }
    )
}

function renderObject(topic, visibility) {
    return `<tr id= "${topic.id}" style="display: ${topic.is_visible === visibility ? "table-row" : " none"} " > <td> <input id= "visibility-cb-${topic.id}"  type="checkbox" class= "cb-visibility ml-4">   <label  class="ml-1">${topic.title}</label> </td> 
        <td> ${durationStr(topic.time)}</td>
        <td>  <a href="${topic.link}" class ="ubuntu">${topic.link} </a> </td>
       <td> <button type="button" 
                    class="btn btn-lg btn-outline-primary" data-toggle="modal" data-target="#topic-form-modal">
                <i class="fa fa-edit"></i>
            </button>
            <button type="button" id="del-btn-${topic.id}"
                        class="btn btn-lg btn-outline-danger">
                    <i class="fa fa-trash"></i>
                </button>
            </td> 
             </tr>`
}

function bindEventsWithRow(id) {
    const checkBox = document.getElementById("visibility-cb-" + id)
    const delBtn = document.getElementById("del-btn-" + id)
    checkBox.addEventListener('click', (event) => toggleSelectionRow(event.target))
    delBtn.addEventListener('click', (event) => onTopicDelete(event.target))

}

// Set/Reset select all checkbox
function toggleSelectionMaster(cb) {

    let table = document.getElementById("js-table")
    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i].id !== "js-table-header") {
            let tr = table.rows[i]
            let td = tr.querySelector('td')
            let checkbox = td.querySelector('input')
            if (tr.style.display !== "none")
                checkbox.checked = cb.checked
        }
    }
}

function toggleSelectionRow() {
    const table = document.getElementById('js-table')
    let flag = true;
    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i].id !== "js-table-header") {
            let tr = table.rows[i]
            let td = tr.querySelector('td')
            let checkbox = td.querySelector('input')
            if (tr.style.display !== "none")
                flag = flag && checkbox.checked
        }
    }
    let cbSelectAll = document.getElementById("select-all-cb")
    cbSelectAll.checked = flag;

}

// Filter rows based on selected option from dropdown menu and reset select all 
function onDropdownChange(dropdown) {
    // Reset the selection
    let cbSelectAll = document.getElementById("select-all-cb")
    cbSelectAll.checked = false;
    toggleSelectionMaster(cbSelectAll)

    //Filter
    let option = dropdown.value.toLowerCase();
    let button = document.getElementById('prev-button')
    button.innerText = option == "hide" ? "Show" : "Hide"
    const visibility = option == "hide" ? false : true
    loadTopics(visibility)
}

// Event to change the toggle the visibility of selected rows
async function changeVisibility() {
    const dropdown = document.getElementById('visibility-dropdown');
    const option = dropdown.value.toLowerCase();
    const table = document.getElementById('js-table')
    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i].id !== 'js-table-header') {
            const tr = table.rows[i]
            const td = tr.querySelector('td')
            const cb = td.querySelector('input')
            const id = tr.id
            if (id !== -1 && cb.checked) {
                let visibility = option === "show" ? false : true;
                updateVisibilityInAPI(id, visibility).then(() => {
                    tr.remove()
                    const cbSelectAll = document.getElementById('select-all-cb');
                    cbSelectAll.checked = false;
                })
            }
        }
    }

}


async function onTopicDelete(event) {
    let id = event?.parentElement?.parentElement?.getAttribute("id")
    id = +id
    let result = confirm("Are you sure you want to delete this row.");
    if (result && id >= 0) {
        deleteTopicByIdInAPI(id).then(() => {
            let topicNode = document.getElementById(id)
            topicNode?.remove()
        }
        )
        let idx = search(topicsList, id)
        topicsList.splice(idx, 1)
    }
}



$('#topic-form-modal').on('show.bs.modal', function (event) {
    let isEditing = event.relatedTarget.parentElement.tagName !== "DIV"
    if (isEditing) {
        editedRow = event?.relatedTarget?.parentElement?.parentElement;
        console.log(editedRow)
        let id = editedRow?.getAttribute("id")
        //TODO: Remove Search
        let idx = search(topicsList, id)
        if (idx >= 0) {
            let topic = topicsList[idx]
            let modal = $(this)
            modal.find('.modal-title').text("Editing Topic")
            modal.find('.modal-body #topic-title').val(topic.title)
            modal.find('.modal-body #topic-time').val(topic.time)
            modal.find('.modal-body #topic-link').val(topic.link)
        }
    }
    else {
        editedRow = null;
        let modal = $(this)
        modal.find('.modal-title').text("Adding Topic")
        modal.find('.modal-body #topic-title').val("")
        modal.find('.modal-body #topic-time').val("")
        modal.find('.modal-body #topic-link').val("")
    }

})

async function onFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const title = data.get("title");
    const link = data.get("link");
    const time = +data.get("time");
    console.log(editedRow)
    let topicData = {
        title: title,
        time: time,
        link: link,
    }
    if (editedRow) {
        updateTopic(editedRow, topicData)
    }
    else {
        createTopicInAPI(topicData).then((res) => {
            const topic = res[0]
            topicsList.push(topic)
            console.log(topic)
            let row = renderObject(topic, topic.is_visible)
            const table = document.getElementById('js-table')
            table.querySelector('tbody').insertAdjacentHTML("beforeend", row)
            debugger
            bindEventsWithRow(topic.id)
        }).catch((error) => alert("Failed to create object " + error.code))
    }
    $('#topic-form-modal').modal('toggle');
    editedRow = null;
}


document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.getElementById('visibility-dropdown');
    dropdown.addEventListener('change', (event) => onDropdownChange(event.target));
    const prevButton = document.getElementById('prev-button');
    prevButton.addEventListener('click', (event) => changeVisibility(event))
    const cbSelectAll = document.getElementById("select-all-cb")
    cbSelectAll.addEventListener('click', (event) => toggleSelectionMaster(event.target))
    const form = document.getElementById("topic-form");
    form.addEventListener("submit", onFormSubmit);
    loadTopics(true)
});


async function updateTopic(editedRow, data) {
    const { title, link, time } = data
    const id = editedRow.id
    const cells = editedRow.getElementsByTagName("td")
    updateTopicInAPI(id, { title, time, link }).then
        ((res) => {
            const topic = res[0]
            const titleCell = cells[0]
            const label = titleCell.querySelector("label")
            label.innerText = title
            const timeCell = cells[1]
            timeCell.innerText = durationStr(time)
            const linkCell = cells[2]
            const anchor = linkCell.querySelector("a")
            anchor.setAttribute("href", link)
            anchor.innerText = link
            const idx = search(topicsList, topic.id)
            topicsList[idx] = topic
        })

}

async function loadTopics(visibility) {
    try {
        const topics = await fetchTopicsFromAPI(visibility);
        const table = document.getElementById("js-table")
        topicsList = topics;
        table.querySelector('tbody').innerHTML = "";
        renderTableRows(topics, table, visibility)
    } catch (error) {
        alert('Error loading topics:', error.message)
        console.error('Error loading topics:', error.message);
    }
}
