const btnAdd = document.getElementById("btn-add");
const overlay = document.getElementById("overlay");
const resumo = document.getElementById("resumo");

/* =========================
   OVERLAY
========================= */

/* abrir */
btnAdd.addEventListener("click", () => {

    /* animação do botão */
    btnAdd.classList.add("animar");

    setTimeout(() => {
        btnAdd.classList.remove("animar");
    }, 300);

    /* abre menu */
    overlay.classList.add("show");
});

/* fechar ao clicar fora */
overlay.addEventListener("click", (e) => {
    if(e.target === overlay){
        overlay.classList.remove("show");
    }
});

/* =========================
   BOTÃO FLUTUANTE INTELIGENTE
========================= */
window.addEventListener("scroll", () => {

    const resumoTopo = resumo.getBoundingClientRect().top;
    const telaAltura = window.innerHeight;

    if(resumoTopo < telaAltura){
        btnAdd.classList.add("subir");
    } else {
        btnAdd.classList.remove("subir");
    }

});

/* =========================
   CRIAR ITEM
========================= */
function criarItem(tipo){

    const div = document.createElement("div");
    div.classList.add("item");
    div.dataset.tipo = tipo;

    let campos = "";

    if(tipo === "Massa"){
        campos = `
            <label>Marca</label>
            <input type="text">

            <label>Valor (R$)</label>
            <input type="number" class="valor">

            <label>Peso total (g)</label>
            <input type="number" class="total">

            <label>Usado (g)</label>
            <input type="number" class="usado">

            <label>Tipo de massa</label>
            <input type="text">
        `;
    }

    if(tipo === "Olhos"){
        campos = `
            <label>Marca</label>
            <input type="text">

            <label>Valor (R$)</label>
            <input type="number" class="valor">

            <label>Quantidade na cartela</label>
            <input type="number" class="total">

            <label>Quantidade usada</label>
            <input type="number" class="usado">
        `;
    }

    if(tipo === "Base Acrílica"){
        campos = `
            <label>Valor (R$)</label>
            <input type="number" class="valor">

            <label>Quantidade no pacote</label>
            <input type="number" class="total">

            <label>Quantidade usada</label>
            <input type="number" class="usado">
        `;
    }

    if(tipo === "Acessório"){
        campos = `
            <label>Marca</label>
            <input type="text">

            <label>Valor (R$)</label>
            <input type="number" class="valor">

            <label>Quantidade total</label>
            <input type="number" class="total">

            <label>Quantidade usada</label>
            <input type="number" class="usado">
        `;
    }

    if(tipo === "Bola de isopor"){
        campos = `
            <label>Tamanho</label>
            <input type="text">

            <label>Valor (R$)</label>
            <input type="number" class="valor">

            <label>Quantidade total</label>
            <input type="number" class="total">

            <label>Quantidade usada</label>
            <input type="number" class="usado">
        `;
    }

    if(tipo === "Pavio"){
        campos = `
            <label>Valor (R$)</label>
            <input type="number" class="valor">

            <label>Quantidade total</label>
            <input type="number" class="total">

            <label>Quantidade usada</label>
            <input type="number" class="usado">
        `;
    }

    div.innerHTML = `
        <h3>${tipo}</h3>
        ${campos}
        <button class="remover">Remover</button>
    `;

    document.getElementById("lista-itens").appendChild(div);

    adicionarEventos(div);

    /* fecha overlay */
    overlay.classList.remove("show");
}

/* =========================
   EVENTOS
========================= */
function adicionarEventos(item){

    const inputs = item.querySelectorAll("input");
    const btnRemover = item.querySelector(".remover");

    /* recalcular em tempo real */
    inputs.forEach(input => {
        input.addEventListener("input", calcular);
    });

    /* remover com animação */
    btnRemover.addEventListener("click", () => {

        item.classList.add("removendo");

        setTimeout(() => {
            item.remove();
            calcular();
        }, 250);

    });
}

/* =========================
   CÁLCULO
========================= */
function calcular(){

    const itens = document.querySelectorAll(".item");

    let custoTotal = 0;

    itens.forEach(item => {

        const valor = parseFloat(item.querySelector(".valor")?.value) || 0;
        const total = parseFloat(item.querySelector(".total")?.value) || 0;
        const usado = parseFloat(item.querySelector(".usado")?.value) || 0;

        if(total > 0){
            const custo = (valor / total) * usado;
            custoTotal += custo;
        }
    });

    /* +20% cola e tinta */
    const adicional = custoTotal * 0.2;
    const final = custoTotal + adicional;

    document.getElementById("custo").innerText = custoTotal.toFixed(2);
    document.getElementById("lucro").innerText = adicional.toFixed(2);
    document.getElementById("final").innerText = final.toFixed(2);

    /* animação do resumo */
    resumo.classList.add("atualizando");

    setTimeout(() => {
        resumo.classList.remove("atualizando");
    }, 150);
}