let botao = document.querySelector(".botao-gerar")
let endereco = "https://api.groq.com/openai/v1/chat/completions"

async function gerarCodigo(){
    let textoUsuario = document.querySelector(".texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")
    let containerResultado = document.querySelector(".resultado")

    botao.innerText = "Gerando..."
    botao.disabled = true

    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
           "Content-Type": "application/json",
           "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{
                role: "system",
                content: "Você é um gerador de código HTML e CSS. Responda somente com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate."
            },
            {
                role: "user",
                content: textoUsuario
            }
        ]
        })
    })

    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content

    blocoCodigo.textContent = resultado
    resultadoCodigo.srcdoc = resultado

    containerResultado.style.display = "flex"

    botao.innerText = "Gerar Codigo!"
    botao.disabled = false

}


botao.addEventListener("click", gerarCodigo)