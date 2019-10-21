var list = [
    {"desc":"Arroz","qnt":"1","valor":"5.40"},
    {"desc":"Cerveja","qnt":"12","valor":"1.99"},
    {"desc":"Carne","qnt":"1","valor":"15.20"}
];

function getTotal(list){
    var total = 0;
    for(var key in list){ //key é a posição do elemento dentro do array - 0, 1, 2
        total += list[key].valor * list[key].qnt
    }
    document.getElementById("totalValor").innerHTML = formatValue(total);
    //return total;
}

function setList(list){
    var table = '<thead><tr><th scope="col">Descrição</th><th scope="col">Qnt</th><th scope="col">Valor</th><th scope="col">Ação</th></tr></thead><tbody>';
    for(var key in list){
        table += '<tr><th scope="row">'+ formatDesc(list[key].desc) +'</th><td>'+ list[key].qnt +'</td><td>'+ formatValue(list[key].valor) +'</td><td><button class="btn btn-primary" onclick="setUpdate('+key+');">Editar</button> <button class="btn btn-danger" onclick="deleteData('+key+');">Excluir</button></td></tr>';    
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

function formatDesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatValue(value){
    var str = "$ " + parseFloat(value).toFixed(2) + "";
    str = str.replace(".", ",");
    return str;
}

function addData(){
    if(!validation())
        return;
    var desc = document.getElementById("desc").value;
    var qnt = document.getElementById("qnt").value;
    var valor = document.getElementById("valor").value;
    //add o item no topo da lista
    list.unshift({"desc":desc,"qnt":qnt,"valor":valor});
    //refresh na tabela
    setList(list);
}

function setUpdate(id){
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("qnt").value = obj.qnt;
    document.getElementById("valor").value = obj.valor;
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'" />';
}

function resetForm(){
    document.getElementById("desc").value = "";
    document.getElementById("qnt").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("btnAdd").style.display = "inline-block";
    document.getElementById("btnUpdate").style.display = "none"; 
    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("erros").style.display = "none";
}

function updateData(){
    if(!validation())
        return;
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var qnt = document.getElementById("qnt").value;
    var valor = document.getElementById("valor").value;
    list[id] = { "desc":desc,"qnt":qnt,"valor":valor }
    resetForm();
    setList(list);
}

function deleteData(id){
    if(confirm('Deseja deletar este item?')){
        if(id === list.length - 1){ // se é o ultimo da lista
            list.pop();
        } else if (id === 0){
            list.shift();
        } else {
            var arrayAuxIni = list.slice(0, id);
            var arrayAuxFim = list.slice(id+1);
            list = arrayAuxIni.concat(arrayAuxFim);
        }
        setList(list);
    }
}

function validation(){
    var desc = document.getElementById("desc").value;
    var qnt = document.getElementById("qnt").value;
    var valor = document.getElementById("valor").value;
    var erros = "";
    if(desc === ""){
        erros += "<p>Preencha o campo 'Descrição'.</p>";
    }
    if(qnt === ""){
        erros += "<p>Preencha o campo 'Quantidade'.</p>"
    } else if(qnt != parseInt(qnt)){
        erros += "<p>Preencha o campo 'Quantidade' com um valor válido.</p>"
    }
    if(valor === ""){
        erros += "<p>Preencha o campo 'Valor'.</p>"
    } else if(valor != parseFloat(valor)){
        erros += "<p>Preencha o campo 'Valor' com um valor válido.</p>"
    }

    if(erros != ""){
        document.getElementById("erros").style.display = "block";
        document.getElementById("erros").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
        document.getElementById("erros").style.color = "white";
        document.getElementById("erros").style.padding = "10px";
        document.getElementById("erros").style.margin = "10px";
        document.getElementById("erros").style.borderRadius = "13px";
        document.getElementById("erros").style.display = "block";
        document.getElementById("erros").innerHTML = "<h3>Erros:</h3>" + erros;
        return 0;
    } else {
        document.getElementById("erros").style.display = "none";
        return 1;
    }
}

function deleteList(){
    if(confirm("Deseja deletar a lista?")){
        list=[];
        setList(list);
    }
}

function saveListStorage(list){
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list", jsonStr);
}

function initListStorage(){
    var testList = localStorage.getItem("list");
    if(testList)
        list = JSON.parse(testList);
    setList(list);
}

initListStorage();