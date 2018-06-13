var gProjs;



// book-shop todos projflex

function createProjs() {
    var projs = [];
    projs.push(createProj('book-shop', 'Book Shop App', 'Book shop application', 'desc', 'URL', 2018, ['book app', 'responsive', 'bootstrap']));
    projs.push(createProj('todos', 'Todo app', 'Todos web app', 'desc', 'URL', 2018, ['todo web app', 'responsive', 'task manager']));
    projs.push(createProj('projflex', 'Flex layout', 'Creating flex layouts', 'desc', 'URL', 2018, ['flex', 'layout', 'responsive', 'bootstrap']));
    projs.push(createProj('touchnums', 'Touch nums', 'Touch the number game', 'desc', 'URL', 2018, ['numtouch', 'logic', 'JS']));
    gProjs = projs;
}



function createProj(id, name, title, desc, url, publishedat, labels) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        url: "projs/" + name,
        publishedAt: publishedat,
        labels: labels
    }
}


function findProj(projId) {
    var proj = gProjs.find(function (proj) {
        return proj.id === projId;
    })
    return proj
}