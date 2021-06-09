function showEntirePara() {
    new SearchDocument("").showEntirePara()

}
function clickSearchButton() {
    new SearchDocument(document.querySelector('#search_keyword').value).showResultListInPage()

}
function onValueChange(value) {

    new SearchDocument(value).showResultListInPage()

}
function cleanKeywordInputs() {
    document.querySelector("#search_keyword").value = ''
    document.querySelector("#show_list").innerHTML = ''
}
function SearchDocument(inputKeyList) {
    this.inputKeyList = inputKeyList.split(' ').filter(e => { return e && e.trim() })
    this.sourceDataList = this.getSourceDataList()
    this.singleParag = ""
}
SearchDocument.prototype.getSourceDataList = function () {
    return document.querySelector('#data_hide').innerHTML.split('#')
}
SearchDocument.prototype.createResultList = function () {
    let resultList = []
    for (let key in this.sourceDataList) {
        this.singleParag = this.sourceDataList[key]
        for (let index in this.inputKeyList) {
            if (this.singleParag.lastIndexOf(this.inputKeyList[index]) >= 0) {
                this.singleParag = this.highlightKeyword(this.inputKeyList[index])
            } else {
                this.singleParag = ''
                break
            }
        }
        if (this.singleParag !== "") {
            resultList.push(this.singleParag)
        }
    }
    return resultList
}
SearchDocument.prototype.highlightKeyword = function (key) {
    return this.singleParag.replace(new RegExp(key, 'gi'), e => {
        return e.replace(e, "<span class='inner'>" + e + "</span>")
    })
}

SearchDocument.prototype.showResultListInPage = function () {
    let targetDiv = document.querySelector("#show_list")
    targetDiv.innerHTML = ''
    let olListStructure = document.createElement('ol')
    targetDiv.appendChild(olListStructure)
    this.createResultList().map(e => {
        let liSinglePara = document.createElement('li')
        liSinglePara.innerHTML = e
        olListStructure.appendChild(liSinglePara)
    })
}
SearchDocument.prototype.showEntirePara = function () {
    let targetDiv = document.querySelector("#show_list")
    targetDiv.innerHTML = ''
    let olListStructure = document.createElement('ol')
    targetDiv.appendChild(olListStructure)
    this.getSourceDataList().map(e => {
        let liSinglePara = document.createElement('li')
        liSinglePara.innerHTML = e
        olListStructure.appendChild(liSinglePara)
    })
}
