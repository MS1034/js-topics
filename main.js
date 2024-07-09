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

function durationStr(
    time,
)
{
    return `${Math.floor(time/60)} hr ${Math.floor(time%60)} min`
}

function renderTableRows(
    
)
{
    let html = ""
    jsTopics.forEach((topic)=>
    {
        html+= `<tr > <td> <input type="checkbox" class= "cb-visibility ml-4" ${topic.isChecked? "checked" : ""}> </td> 
        <td> ${topic.title}</td>
        <td> ${durationStr(topic.time)}</td>
        <td>  <a href="${topic.link}" class ="ubuntu">${topic.link} </a> </td>
        </tr>`
    }
    )
    return html
}

function onToggleVisibility(cb)
{
    jsTopics.forEach((topic) => { topic.isChecked = cb.checked} )
    let allCheckboxes = document.getElementsByClassName("cb-visibility")
    allCheckboxes = Array.from(allCheckboxes)
    allCheckboxes.forEach((checkbox)=>{checkbox.checked= cb.checked})
}

function onDropdownChange(dropdown)
{
    let option = dropdown.value.toLowerCase();
    let button =  document.getElementById('prev-button')
    button.innerText = option == "hide" ? "Show" : "Hide"
    let table = document.getElementById("js-table")
    for(let i = 0; i<table.rows.length; i++)
    {
        if(table.rows[i].id !== "js-table-header")
        {
            let tr = table.rows[i]
            let td = tr.querySelector("td")
            let cb = td.querySelector("input")
            if(option == "hide")
                tr.style.display = cb?.checked ? "none" : "table-row";
            else
                tr.style.display = cb?.checked ? "table-row" : "none";
        }
    }

}

function showPrevious()
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
            if(option == "hide")
                tr.style.display =  "table-row" ;
            else if(option == "show")
                tr.style.display =  "table-row";
        }
    }
}

let table =document.getElementById("js-table")
let tableRows = renderTableRows()
table.insertAdjacentHTML("beforeend",tableRows)