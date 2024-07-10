// List of all topics 
let jsTopics = [
    {isChecked:false, 
    title: "Closure",
    time:60 , 
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"
    },
    {isChecked:true, 
        title: "Scope & Hoisting",
        time:135 , 
        link: "https://developer.mozilla.org/en-US/docs/Glossary/Scope"
    },
    {isChecked:true, 
        title: "DOM Mainpulation",
        time:351 , 
        link: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents"
    }
]


// Generate unique id for each topic
function* generatorOfIds(id=0) {
    while(true)
    {
        yield id++;

    }
  }
 let generator = generatorOfIds();


// Convert Int minutes to hr mins. 
function durationStr(
    time,
)
{
    return `${Math.floor(time/60)} hr ${Math.floor(time%60)} min`
}

// Search from list based on id and return index
function search(id)
{
   for (let topic of jsTopics)
   {
       
       id =  +id
        if(topic.id === id)
            return jsTopics.indexOf(topic)
   }
   return -1
}




// return string of table rows generated
function renderTableRows(
    
)
{
    let html = ""
    jsTopics.forEach((topic)=>
    {
        topic.id = generator.next().value;
        html+= renderObject(topic)
    }
    )
    return html
}

function renderObject(topic)
{
   return `<tr id= "${topic.id}" style="display: ${topic.isChecked? "table-row" : " none"} " onclick="toggleSelectionRow(this)"> <td> <input  type="checkbox" class= "cb-visibility ml-4" >   <label for="select-all-cb" class="ml-1">${topic.title}</label> </td> 
        <td> ${durationStr(topic.time)}</td>
        <td>  <a href="${topic.link}" class ="ubuntu">${topic.link} </a> </td>
       <td> <button type="button" 
                    class="btn btn-lg btn-outline-primary" data-toggle="modal" data-target="#topicModal">
                <i class="fa fa-edit"></i>
            </button>
            <button type="button"
        onclick="onTopicDelete(this)"
                        class="btn btn-lg btn-outline-danger">
                    <i class="fa fa-trash"></i>
                </button>
            </td> 
             </tr>`
}

// Set/Reset select all checkbox
function toggleSelectionMaster(cb)
{
    let table = document.getElementById("js-table")
    for(let i = 0; i<table.rows.length; i++)
    {
        if(table.rows[i].id !== "js-table-header")
        {
            let tr = table.rows[i]
            let td = tr.querySelector('td')
            let checkbox = td.querySelector('input')
            if(tr.style.display !== "none")
                checkbox.checked = cb.checked
        }
    }
}

function toggleSelectionRow()
{
    let flag = true;
    for(let i = 0; i<table.rows.length; i++)
    {
        if(table.rows[i].id !== "js-table-header")
        {
            let tr = table.rows[i]
            let td = tr.querySelector('td')
            let checkbox = td.querySelector('input')
            if(tr.style.display !== "none")
                flag = flag && checkbox.checked 
        }
    }
    let cbSelectAll = document.getElementById("select-all-cb")
    cbSelectAll.checked = flag;
    
}

// Filter rows based on selected option from dropdown menu and reset select all 
function onDropdownChange(dropdown)
{
    // Reset the selection
    let cbSelectAll = document.getElementById("select-all-cb")
    cbSelectAll.checked =false;
    toggleSelectionMaster(cbSelectAll)

    //Filter
    let option = dropdown.value.toLowerCase();
    let button =  document.getElementById('prev-button')
    button.innerText = option == "hide" ? "Show" : "Hide"
    let table = document.getElementById("js-table")
    for(let i = 0; i<table.rows.length; i++)
    {
        if(table.rows[i].id !== "js-table-header")
        {
            let tr = table.rows[i]
            let id = search(tr.id)
            if(id !== -1)
                if(option == "hide")
                    tr.style.display = jsTopics[id].isChecked ? "none" : "table-row";
                else
                    tr.style.display = jsTopics[id].isChecked ? "table-row" : "none";
        }
    }

}

// Event to change the toggle the visibility of selected rows
function changeVisibility()
{
    let dropdown = document.getElementById('visibility-dropdown');
    let option = dropdown.value.toLowerCase();
    let table = document.getElementById('js-table')
    for(let i = 0; i<table.rows.length; i++)
    {
        if(table.rows[i].id !== 'js-table-header')
        {
            let tr = table.rows[i]
            let td = tr.querySelector('td')
            let cb = td.querySelector('input')
            let id = search(tr.id)
            if(id!==-1 && option == "hide" && cb.checked)
            {
                tr.style.display =  "none" ;
                jsTopics[id].isChecked =true;
                cb.checked =false;
            }
            else if(id!=-1 && option == "show" && cb.checked)
            {
                tr.style.display =  "none" ;
                jsTopics[id].isChecked =false;
                cb.checked =false;
            }

        }
    }
}


function onTopicDelete(event)
{
    id=event?.parentElement?.parentElement?.getAttribute("id")
    id = +id
    let result = confirm("Are you sure you want to delete this topiic.");
    console.log(result)
    if(result  && id >= 0)
    {
        let topicNode = document.getElementById(id)
        topicNode.remove()
        let idx  = search(id)
        jsTopics.splice(idx,1)
    }
}

// function validateURL(urlString)
// {
//     try { 
//         return Boolean(new URL(urlString)); 
//     }
//     catch(e){ 
//         return false; 
//     }
// }

let table =document.getElementById("js-table")
let tableRows = renderTableRows()
table.insertAdjacentHTML("beforeend",tableRows)
let editedRow;
let isEditing;

$('#topicModal').on('show.bs.modal', function (event) {
    isEditing = event.relatedTarget.parentElement.tagName !== "DIV"

    if(isEditing)
    {
        editedRow = event?.relatedTarget?.parentElement?.parentElement;
        id= editedRow?.getAttribute("id")
        let idx = search(id)
        if(idx>=0)
        {
            let topic = jsTopics[idx]
            let modal = $(this)
            modal.find('.modal-title').text("Editing Topic")
            modal.find('.modal-body #topic-title').val(topic.title)
            modal.find('.modal-body #topic-time').val(topic.time)
            modal.find('.modal-body #topic-link').val(topic.link)
        }
    }
    else
    { 
        let modal = $(this)
        modal.find('.modal-title').text("Adding Topic")
        modal.find('.modal-body #topic-title').val("")
        modal.find('.modal-body #topic-time').val("")
        modal.find('.modal-body #topic-link').val("")

    }
   
})

$("#topic-form").submit(function(event){
    let title = $("#topic-title").val()
    let time = $("#topic-time").val()
    let link = $("#topic-link").val()
    if(isEditing)
    {

        let cells = editedRow.getElementsByTagName("td") 
        let titleCell = cells[0]
        let label = titleCell.querySelector("label")
        label.innerText = title
        let timeCell = cells[1]
        timeCell.innerText = durationStr(time)
        let linkCell = cells[2]
        let anchor = linkCell.querySelector("a")
        anchor.setAttribute("href", link)
        anchor.innerText = link
        
        let idx = search(editedRow.id)
        jsTopics[idx].title = title
        jsTopics[idx].time = +time, 
        jsTopics[idx].link = link, 
          
        event.preventDefault(); 
        $('#topicModal').modal('toggle');
        editedRow = null;
    }
    else
    {
        let topic = {
            id: generator.next().value,
            title: title,
            time: time,
            link: link,
            isChecked: true,
        }
        jsTopics.push(topic)
        let row = renderObject(topic)
        console.log(row)
        debugger
        table.insertAdjacentHTML("beforeend",row)
        event.preventDefault(); 
        $('#topicModal').modal('toggle');
        isEditing = false;
        
    }
  });