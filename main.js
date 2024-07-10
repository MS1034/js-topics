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
        html+= `<tr id= "${topic.id}" style="display: ${topic.isChecked? "table-row" : " none"} " onclick="toggleSelectionRow()"> <td> <input  type="checkbox" class= "cb-visibility ml-4" >   <label for="select-all-cb" class="ml-1">${topic.title}</label> </td> 
        <td> ${durationStr(topic.time)}</td>
        <td>  <a href="${topic.link}" class ="ubuntu">${topic.link} </a> </td>
        </tr>`
    }
    )
    return html
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
    let table = document.getElementById("js-table")
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


let table =document.getElementById("js-table")
let tableRows = renderTableRows()
table.insertAdjacentHTML("beforeend",tableRows)
