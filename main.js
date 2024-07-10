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
let svg = '<svg viewBox="0 0 1024 1024" fill="#000000" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z" fill=""></path><path d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z" fill=""></path></g></svg>'


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
       <td> <button type="button"
                    class="btn btn-lg btn-outline-primary">
                <i class="fa fa-edit"></i>
            </button> </td> </td>
       <td> <button type="button"
                    class="btn btn-lg btn-outline-danger">
                <i class="fa fa-trash"></i>
            </button> </td>

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
