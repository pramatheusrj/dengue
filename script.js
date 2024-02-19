function contarSintomas() {
    // Substitua os IDs pelos reais IDs dos checkboxes dos sintomas no seu HTML
    const idsSintomas = ['nausea', 'vomito', 'exantema', 'mialgia', 'artralgia', 'cefaleia', 'dorRetroorbitaria', 'petequias', 'provaLacoPositiva', 'leucopenia'];
    let contador = 0;

    // Conta quantos sintomas foram marcados
    idsSintomas.forEach(id => {
        if (document.getElementById(id) && document.getElementById(id).checked) {
            contador++;
        }
    });

    return contador;
}

function mostrarOpcoesSintomas() {
    const tempoFebre = document.getElementById('tempoFebre').value;
    const sintomasDiv = document.getElementById('sintomas');
    sintomasDiv.style.display = tempoFebre === '2a7' ? 'block' : 'none';
}

function avaliarTriagem() {
    const tempoFebre = document.getElementById('tempoFebre').value;
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = ""; // Limpa o conteúdo anterior antes de adicionar novo conteúdo

    let mensagem = "";
    const quantidadeSintomas = contarSintomas();

    if (quantidadeSintomas <= 1) {
        resultadoDiv.innerHTML = "Isso pode não ser dengue, tem poucos sintomas.";
        return; // Impede que o restante do código seja executado
    } else if (quantidadeSintomas > 1) {
        resultadoDiv.innerHTML += "Pode ser dengue. ";
        // Continua com a lógica abaixo
    }

    if (tempoFebre === "menor2") {
        mensagem = "Ainda não tem critérios para realizar exames de sangue, tempo de sintomas menor que 2 dias. Orientar sintomático se possível e retorno em 24 ou 48 horas.";
    } else if (tempoFebre === "maior7") {
        mensagem = "Tempo de febre superior a 7 dias, pense em outra doença.";
    } else if (tempoFebre === "2a7") {
        // Aqui, o conteúdo é dinâmico e específico para este caso, então o uso de innerHTML é adequado
        
		
		
		resultadoDiv.innerHTML = `
ATENÇÃO ----->  Isso pode ser dengue <br>
Verifique se o paciente tem sinais de alarme ou gravidade:<br>
            - Dor abdominal intensa e contínua.<br>
            - Vômitos persistentes.<br>
            - Acúmulo de líquidos.<br>
            - Sangramento de mucosa.<br>
            - Letargia ou irritabilidade.<br>
            - Aumento progressivo do hematócrito.<br>
            - Dificuldade respiratória.<br><br>
            O paciente apresenta algum desses sinais?<br>`;

        const botaoSim = document.createElement('button');
        botaoSim.innerText = 'Sim';
        botaoSim.addEventListener('click', function() {
            alert('O paciente deve ser internado para observação.');
            const possuiSinaisChoqueOuComprometimentoGrave = confirm(
                'O paciente possui algum destes sinais?\n' +
                '- Comprometimento grave de órgãos\n' +
                '- Sangramento grave\n' +
                '- Sinais de Choque: Extravasamento grave de plasma, taquicardia, extremidades frias, pulso fraco, enchimento capilar lento, pressão arterial convergente, taquipneia, oliguria, hipotensão arterial, cianose, acumulação de líquido com insuficiência respiratória.'
            );
            if (possuiSinaisChoqueOuComprometimentoGrave) {
                alert('O paciente pertence ao grupo D. Deve ser encaminhado à Unidade de Terapia Intensiva.');
            } else {
                alert('O paciente pertence ao grupo C. Deve ser internado no andar, na Clínica Médica.');
                window.location.href = 'pacienteC.html';
            }
        });
        resultadoDiv.appendChild(botaoSim);

        const botaoNao = document.createElement('button');
        botaoNao.innerText = 'Não';
        botaoNao.addEventListener('click', function() {
            const temSangramento = confirm('O paciente apresenta SANGRAMENTO ESPONTÂNEO de pele ou induzido: PROVA DO LAÇO, CONDIÇÃO CLÍNICA ESPECIAL, RISCO SOCIAL, ou COMORBIDADES?');
            if (temSangramento) {
                alert('O paciente pertence ao grupo B.');
                window.location.href = 'pacienteB.html';
            } else {
                alert('O paciente pertence ao grupo A. E deve ser acompanhado de forma ambulatorial.');
                const pesoPaciente = prompt('Informe o peso do paciente em kg para calcular a hidratação necessária:');
                if (pesoPaciente) {
                    const peso = parseFloat(pesoPaciente);
                    if (!isNaN(peso) && peso > 0) {
                        const hidratacaoTotal = peso * 60; // 60 ml/kg/dia
                        const hidratacaoDoisTerços = hidratacaoTotal * (2 / 3);
                        const hidratacaoUmTerço = hidratacaoTotal * (1 / 3);
                        alert(`Quantidade total de líquido recomendada por dia: ${hidratacaoTotal} ml\nDividido em:\n- Primeira parte - Líquido Caseiro (2/3 do total): ${hidratacaoDoisTerços.toFixed(2)} ml\n- Segunda parte - Solução de Sais de reidratação oral (SRO) (1/3 do total): ${hidratacaoUmTerço.toFixed(2)} ml\nRetorno se sinais de alarme ou em 5 dias caso não melhore dos sintomas.`);
                    } else {
                        alert('Peso informado é inválido.');
                    }
                }
            }
        });
        resultadoDiv.appendChild(botaoNao);
    } else {
        mensagem = "Por favor, selecione uma opção válida.";
    }

    // Se a mensagem for definida, exibir como texto. Isso evita a sobrescrita dos elementos dinâmicos criados.
    if (mensagem) {
        resultadoDiv.textContent = mensagem;
    }
}
