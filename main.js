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


// return string of table rows generated
function renderTableRows(
    
)
{
    let html = ""
    jsTopics.forEach((topic)=>
    {
        topic.id = generator.next().value;
        html+= `<tr id= "${topic.id}" style="display: ${topic.isChecked? "table-row" : " none"} "> <td> <input  type="checkbox" class= "cb-visibility ml-4" > </td> 
        <td> ${topic.title}</td>
        <td> ${durationStr(topic.time)}</td>
        <td>  <a href="${topic.link}" class ="ubuntu">${topic.link} </a> </td>
        </tr>`
    }
    )
    return html
}


function toggleSelection(cb)
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

function onDropdownChange(dropdown)
{
    // Reset the selection
    let cbSelectAll = document.getElementById("select-all-cb")
    cbSelectAll.checked =false;
    toggleSelection(cbSelectAll)

    let option = dropdown.value.toLowerCase();
    let button =  document.getElementById('prev-button')
    button.innerText = option == "hide" ? "Show" : "Hide"
    let table = document.getElementById("js-table")
    for(let i = 0; i<table.rows.length; i++)
    {
        if(table.rows[i].id !== "js-table-header")
        {
            let tr = table.rows[i]
            let id = tr.id
            if(option == "hide")
                tr.style.display = jsTopics[id].isChecked ? "none" : "table-row";
            else
                tr.style.display = jsTopics[id].isChecked ? "table-row" : "none";
        }
    }

}

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
            if(option == "hide" && cb.checked)
            {
                tr.style.display =  "none" ;
                jsTopics[tr.id].isChecked =true;
                cb.checked =false;
            }
            else if(option == "show" && cb.checked)
            {
                tr.style.display =  "none" ;
                jsTopics[tr.id].isChecked =false;
                cb.checked =false;
            }

        }
    }
}

let table =document.getElementById("js-table")
let tableRows = renderTableRows()
table.insertAdjacentHTML("beforeend",tableRows)
