const content = document.querySelector('.content');
const index = document.querySelector('.index');


displayHTML(`https://raw.githubusercontent.com/sarthaksavvy/100DaysOfAWS/main/Day-001-100DaysOfAWS.md`)

fetch("https://api.github.com/repos/sarthaksavvy/100DaysOfAWS/contents/")
    .then(res => res.json())
    .then(data => {
        data.forEach(day => {
            if (day.name.includes('Day')) {
                let h3 = document.createElement("h3")
                h3.textContent = day.name.substring(0, 7).replace('-', ' ');
                h3.classList.add(`${day.name[6]}`)
                h3.classList.add('item')
                index.appendChild(h3);
            }
        })
    })

let items = document.querySelectorAll('.item');
// index.firstElementChild.classList.add('active');
// console.log(index.childNodes.item(3));
// console.log(index.childNodes.item(2));
console.log(":asf");

index.addEventListener('click', function (e) {
    
    if (e.target.classList.contains('item')) {
        let id = e.target.classList[0];
        console.log(e.target);
        let link = `https://raw.githubusercontent.com/sarthaksavvy/100DaysOfAWS/main/Day-00${id}-100DaysOfAWS.md`
        displayHTML(link);
        items.forEach(item => item.classList.remove('active'))
        e.target.classList.add('active');
        
    }
    })

async function displayHTML(link) {
    let converter = new showdown.Converter();


    // fetch(link).then(res => res.text())
    //same as below like two 'then': one for link, second for text

    let markdown = await (await fetch(link)).text();
    let html = converter.makeHtml(markdown);

    content.innerHTML = `${html}`
}