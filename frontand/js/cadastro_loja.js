
// ==========================================
// ENGAJA
// CADASTRO DE LOJA
// Arquivo: js/cadastro_loja.js
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formCadastroLoja");
    const mensagemSucesso = document.getElementById("mensagemSucesso");
    const btnVoltarFormulario = document.getElementById("btnVoltarFormulario");

    const cnpj = document.getElementById("cnpj");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const senha = document.getElementById("senha");
    const confirmarSenha = document.getElementById("confirmarSenha");
    const descricao = document.getElementById("descricao");
    const contadorDescricao = document.getElementById("contadorDescricao");
    const logoLoja = document.getElementById("logoLoja");
    const previewLogo = document.getElementById("previewLogo");
    const textoUpload = document.getElementById("textoUpload");

    // ==========================================
    // FUNÇÃO PARA OBTER SOMENTE NÚMEROS
    // ==========================================

    function somenteNumeros(valor) {
        return valor.replace(/\D/g, "");
    }

    // ==========================================
    // MÁSCARA DE CNPJ
    // ==========================================

    if (cnpj) {
        cnpj.addEventListener("input", function () {
            let valor = somenteNumeros(this.value).slice(0, 14);

            valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
            valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
            valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
            valor = valor.replace(/(\d{4})(\d)/, "$1-$2");

            this.value = valor;
        });
    }

    // ==========================================
    // MÁSCARA DE TELEFONE
    // ==========================================

    if (telefone) {
        telefone.addEventListener("input", function () {
            let valor = somenteNumeros(this.value).slice(0, 11);

            if (valor.length > 10) {
                valor = valor.replace(
                    /^(\d{2})(\d{5})(\d{4})$/,
                    "($1) $2-$3"
                );
            } else if (valor.length > 6) {
                valor = valor.replace(
                    /^(\d{2})(\d{4})(\d{0,4})$/,
                    "($1) $2-$3"
                );
            } else if (valor.length > 2) {
                valor = valor.replace(/^(\d{2})(\d+)/, "($1) $2");
            }

            this.value = valor;
        });
    }

    // ==========================================
    // MÁSCARA DE CEP
    // ==========================================

    if (cep) {
        cep.addEventListener("input", function () {
            let valor = somenteNumeros(this.value).slice(0, 8);

            if (valor.length > 5) {
                valor = valor.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
            }

            this.value = valor;
        });
    }

    // ==========================================
    // MOSTRAR OU OCULTAR SENHA
    // ==========================================

    document.querySelectorAll(".mostrar-senha").forEach(function (botao) {
        botao.addEventListener("click", function () {
            const campoSenha = this.parentElement.querySelector("input");

            if (!campoSenha) return;

            const estaOculta = campoSenha.type === "password";

            campoSenha.type = estaOculta ? "text" : "password";

            this.textContent = estaOculta ? "Ocultar" : "Mostrar";
            this.setAttribute(
                "aria-label",
                estaOculta ? "Ocultar senha" : "Mostrar senha"
            );
        });
    });

    // ==========================================
    // CONTADOR DE CARACTERES DA DESCRIÇÃO
    // ==========================================

    function atualizarContador() {
        if (!descricao || !contadorDescricao) return;

        contadorDescricao.textContent = descricao.value.length + "/300";
    }

    if (descricao) {
        descricao.addEventListener("input", atualizarContador);
        atualizarContador();
    }

    // ==========================================
    // PRÉ-VISUALIZAÇÃO DA LOGO
    // ==========================================

    if (logoLoja) {
        logoLoja.addEventListener("change", function () {
            const arquivo = this.files[0];

            if (!arquivo) {
                if (previewLogo) {
                    previewLogo.removeAttribute("src");
                    previewLogo.hidden = true;
                }

                if (textoUpload) {
                    textoUpload.textContent =
                        "Selecione uma imagem para a logo da loja.";
                }

                limparErro("erroLogo");
                return;
            }

            const tiposPermitidos = ["image/png", "image/jpeg"];
            const tamanhoMaximo = 2 * 1024 * 1024;

            if (!tiposPermitidos.includes(arquivo.type)) {
                mostrarErro(
                    "erroLogo",
                    "Selecione uma imagem PNG ou JPG."
                );

                this.value = "";
                return;
            }

            if (arquivo.size > tamanhoMaximo) {
                mostrarErro(
                    "erroLogo",
                    "A imagem deve ter no máximo 2 MB."
                );

                this.value = "";
                return;
            }

            limparErro("erroLogo");

            if (previewLogo) {
                previewLogo.src = URL.createObjectURL(arquivo);
                previewLogo.hidden = false;
                previewLogo.alt = "Pré-visualização da logo da loja";
            }

            if (textoUpload) {
                textoUpload.textContent = arquivo.name;
            }
        });
    }

    // ==========================================
    // MOSTRAR ERROS
    // ==========================================

    function mostrarErro(idErro, mensagem) {
        const elementoErro = document.getElementById(idErro);

        if (elementoErro) {
            elementoErro.textContent = mensagem;
            elementoErro.hidden = false;
        }
    }

    function limparErro(idErro) {
        const elementoErro = document.getElementById(idErro);

        if (elementoErro) {
            elementoErro.textContent = "";
            elementoErro.hidden = true;
        }
    }

    function limparTodosErros() {
        document.querySelectorAll(".erro").forEach(function (elemento) {
            elemento.textContent = "";
            elemento.hidden = true;
        });
    }

    // ==========================================
    // VALIDAR CAMPOS
    // ==========================================

    function validarCampo(idCampo, idErro, mensagem) {
        const campo = document.getElementById(idCampo);

        if (!campo) return true;

        if (!campo.value.trim()) {
            mostrarErro(idErro, mensagem);
            return false;
        }

        limparErro(idErro);
        return true;
    }

    // ==========================================
    // VALIDAR E-MAIL
    // ==========================================

    function validarEmail() {
        const email = document.getElementById("emailLoja");

        if (!email) return true;

        if (!email.value.trim()) {
            mostrarErro("erroEmail", "Informe o e-mail da loja.");
            return false;
        }

        if (!email.validity.valid) {
            mostrarErro("erroEmail", "Informe um e-mail válido.");
            return false;
        }

        limparErro("erroEmail");
        return true;
    }

    // ==========================================
    // VALIDAR CNPJ
    // ==========================================

    function validarCnpj() {
        if (!cnpj) return true;

        const numeros = somenteNumeros(cnpj.value);

        if (numeros.length !== 14) {
            mostrarErro("erroCnpj", "O CNPJ deve ter 14 números.");
            return false;
        }

        limparErro("erroCnpj");
        return true;
    }

    // ==========================================
    // VALIDAR TELEFONE
    // ==========================================

    function validarTelefone() {
        if (!telefone) return true;

        const numeros = somenteNumeros(telefone.value);

        if (numeros.length < 10 || numeros.length > 11) {
            mostrarErro(
                "erroTelefone",
                "Informe um telefone com DDD válido."
            );

            return false;
        }

        limparErro("erroTelefone");
        return true;
    }

    // ==========================================
    // VALIDAR SENHA
    // ==========================================

    function validarSenha() {
        if (!senha) return true;

        if (senha.value.length < 8) {
            mostrarErro(
                "erroSenha",
                "A senha deve ter pelo menos 8 caracteres."
            );

            return false;
        }

        limparErro("erroSenha");
        return true;
    }

    // ==========================================
    // CONFIRMAR SENHA
    // ==========================================

    function validarConfirmacaoSenha() {
        if (!senha || !confirmarSenha) return true;

        if (!confirmarSenha.value) {
            mostrarErro(
                "erroConfirmarSenha",
                "Confirme sua senha."
            );

            return false;
        }

        if (senha.value !== confirmarSenha.value) {
            mostrarErro(
                "erroConfirmarSenha",
                "As senhas não coincidem."
            );

            return false;
        }

        limparErro("erroConfirmarSenha");
        return true;
    }

    // ==========================================
    // VALIDAR CEP
    // ==========================================

    function validarCep() {
        if (!cep) return true;

        const numeros = somenteNumeros(cep.value);

        if (numeros.length !== 8) {
            mostrarErro("erroCep", "O CEP deve ter 8 números.");
            return false;
        }

        limparErro("erroCep");
        return true;
    }

    // ==========================================
    // VALIDAR CATEGORIAS
    // ==========================================

    function validarCategorias() {
        const selecionadas = document.querySelectorAll(
            'input[name="categorias"]:checked'
        );

        if (selecionadas.length === 0) {
            mostrarErro(
                "erroCategorias",
                "Selecione pelo menos uma categoria."
            );

            return false;
        }

        limparErro("erroCategorias");
        return true;
    }

    // ==========================================
    // VALIDAR TERMOS
    // ==========================================

    function validarTermos() {
        const aceiteTermos = document.getElementById("aceiteTermos");

        if (!aceiteTermos) return true;

        if (!aceiteTermos.checked) {
            mostrarErro(
                "erroTermos",
                "Você precisa aceitar os termos para continuar."
            );

            return false;
        }

        limparErro("erroTermos");
        return true;
    }

    // ==========================================
    // ENVIAR FORMULÁRIO
    // ==========================================

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            limparTodosErros();

            const validacoes = [
                validarCampo(
                    "nomeLoja",
                    "erroNomeLoja",
                    "Informe o nome da loja."
                ),

                validarCnpj(),

                validarCampo(
                    "responsavel",
                    "erroResponsavel",
                    "Informe o nome do responsável."
                ),

                validarEmail(),
                validarTelefone(),
                validarSenha(),
                validarConfirmacaoSenha(),
                validarCep(),

                validarCampo(
                    "estado",
                    "erroEstado",
                    "Selecione o estado."
                ),

                validarCampo(
                    "cidade",
                    "erroCidade",
                    "Informe a cidade."
                ),

                validarCampo(
                    "endereco",
                    "erroEndereco",
                    "Informe o endereço."
                ),

                validarCampo(
                    "numero",
                    "erroNumero",
                    "Informe o número do endereço."
                ),

                validarCampo(
                    "bairro",
                    "erroBairro",
                    "Informe o bairro."
                ),

                validarCategorias(),
                validarTermos()
            ];

            const formularioValido = validacoes.every(Boolean);

            if (!formularioValido) {
                const primeiroErro = formulario.querySelector(
                    ".erro:not(:empty)"
                );

                if (primeiroErro) {
                    primeiroErro.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }

                return;
            }

            // Neste momento, os dados são apenas validados.
            // O cadastro permanente será implementado quando
            // o sistema estiver conectado ao backend.

            formulario.hidden = true;

            if (mensagemSucesso) {
                mensagemSucesso.hidden = false;

                mensagemSucesso.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            console.log(
                "ENGAJA - Formulário validado. Nenhum cadastro foi salvo."
            );
        });
    }

    // ==========================================
    // VOLTAR AO FORMULÁRIO
    // ==========================================

    if (btnVoltarFormulario) {
        btnVoltarFormulario.addEventListener("click", function () {
            if (formulario) {
                formulario.hidden = false;
            }

            if (mensagemSucesso) {
                mensagemSucesso.hidden = true;
            }

            if (formulario) {
                formulario.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }

    // ==========================================
    // MENSAGEM NO CONSOLE
    // ==========================================

    console.log(
        "ENGAJA - Cadastro de loja carregado corretamente."
    );
});
