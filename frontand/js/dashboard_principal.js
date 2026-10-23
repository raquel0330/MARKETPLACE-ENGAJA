// ==========================================
// ENGAJA
// DASHBOARD PRINCIPAL
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ELEMENTOS
    // ==========================================

    const campoPesquisa =
        document.getElementById("campoPesquisa");

    const btnPesquisar =
        document.getElementById("btnPesquisar");

    const btnExplorar =
        document.getElementById("btnExplorar");

    const btnVerTodos =
        document.getElementById("btnVerTodos");

    const btnVoltarInicio =
        document.getElementById("btnVoltarInicio");

    const produtos =
        document.querySelectorAll(".produto");

    const categorias =
        document.querySelectorAll(".categoria");

    const botoesProduto =
        document.querySelectorAll(".btn-produto");

    const botoesLoja =
        document.querySelectorAll(".btn-loja-card");


    // ==========================================
    // MENU "MEU PERFIL"
    // ==========================================

    const btnPerfil =
        document.getElementById("btnPerfil");

    const perfilDropdown =
        document.getElementById("perfilDropdown");

    const btnEntrar =
        document.getElementById("btnEntrar");

    const btnCriarConta =
        document.getElementById("btnCriarConta");


    // ==========================================
    // MODAL DE LOGIN
    // ==========================================

    const modalLogin =
        document.getElementById("modalLogin");

    const fecharLogin =
        document.getElementById("fecharLogin");

    const formLogin =
        document.getElementById("formLogin");


    // ==========================================
    // MENU MEU PERFIL
    // ==========================================

    if (btnPerfil && perfilDropdown) {

        btnPerfil.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                perfilDropdown.classList.toggle("aberto");

            }
        );

    }


    // Fecha o menu quando clicar fora

    document.addEventListener(
        "click",
        function (event) {

            if (
                perfilDropdown &&
                btnPerfil &&
                !perfilDropdown.contains(event.target) &&
                !btnPerfil.contains(event.target)
            ) {

                perfilDropdown.classList.remove("aberto");

            }

        }
    );


    // ==========================================
    // BOTÃO ENTRAR
    // ==========================================

    if (btnEntrar) {

        btnEntrar.addEventListener(
            "click",
            function () {

                if (perfilDropdown) {

                    perfilDropdown.classList.remove("aberto");

                }

                if (modalLogin) {

                    modalLogin.classList.add("aberto");

                }

            }
        );

    }


    // ==========================================
    // BOTÃO CRIAR CONTA
    // ==========================================

    if (btnCriarConta) {

        btnCriarConta.addEventListener(
            "click",
            function () {

                if (perfilDropdown) {

                    perfilDropdown.classList.remove("aberto");

                }

                alert(
                    "A área de cadastro será desenvolvida nas próximas etapas do projeto."
                );

            }
        );

    }


    // ==========================================
    // FECHAR LOGIN
    // ==========================================

    if (fecharLogin) {

        fecharLogin.addEventListener(
            "click",
            function () {

                if (modalLogin) {

                    modalLogin.classList.remove("aberto");

                }

            }
        );

    }


    // ==========================================
    // FECHAR LOGIN CLICANDO FORA
    // ==========================================

    if (modalLogin) {

        modalLogin.addEventListener(
            "click",
            function (event) {

                if (event.target === modalLogin) {

                    modalLogin.classList.remove("aberto");

                }

            }
        );

    }


    // ==========================================
    // LOGIN
    // ==========================================

    if (formLogin) {

        formLogin.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                alert(
                    "O login será conectado ao banco de dados em uma próxima etapa."
                );

            }
        );

    }


    // ==========================================
    // PESQUISA DE PRODUTOS
    // ==========================================

    function pesquisar() {

        if (!campoPesquisa) {
            return;
        }


        const termo =
            campoPesquisa.value
                .trim()
                .toLowerCase();


        // Se o campo estiver vazio

        if (termo === "") {

            produtos.forEach(
                function (produto) {

                    produto.style.display = "block";

                }
            );

            return;

        }


        let encontrou = false;


        produtos.forEach(
            function (produto) {

                const nome =
                    (
                        produto.dataset.nome || ""
                    ).toLowerCase();


                const categoria =
                    (
                        produto.dataset.categoria || ""
                    ).toLowerCase();


                const texto =
                    produto.innerText.toLowerCase();


                if (
                    nome.includes(termo) ||
                    categoria.includes(termo) ||
                    texto.includes(termo)
                ) {

                    produto.style.display = "block";

                    encontrou = true;

                } else {

                    produto.style.display = "none";

                }

            }
        );


        // Leva o usuário até os produtos

        const produtosSection =
            document.getElementById("produtos");


        if (produtosSection) {

            produtosSection.scrollIntoView({
                behavior: "smooth"
            });

        }


        // Caso não encontre

        if (!encontrou) {

            alert(
                "Nenhum produto encontrado para: " +
                campoPesquisa.value
            );

        }

    }


    // ==========================================
    // BOTÃO PESQUISAR
    // ==========================================

    if (btnPesquisar) {

        btnPesquisar.addEventListener(
            "click",
            pesquisar
        );

    }


    // ==========================================
    // PESQUISA COM ENTER
    // ==========================================

    if (campoPesquisa) {

        campoPesquisa.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    pesquisar();

                }

            }
        );

    }


    // ==========================================
    // BOTÃO EXPLORAR
    // ==========================================

    if (btnExplorar) {

        btnExplorar.addEventListener(
            "click",
            function () {

                const produtosSection =
                    document.getElementById("produtos");


                if (produtosSection) {

                    produtosSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    // ==========================================
    // CATEGORIAS
    // ==========================================

    categorias.forEach(
        function (categoria) {

            categoria.addEventListener(
                "click",
                function () {

                    const categoriaSelecionada =
                        (
                            categoria.dataset.categoria || ""
                        ).toLowerCase();


                    let encontrou = false;


                    produtos.forEach(
                        function (produto) {

                            const categoriaProduto =
                                (
                                    produto.dataset.categoria || ""
                                ).toLowerCase();


                            if (
                                categoriaProduto ===
                                categoriaSelecionada
                            ) {

                                produto.style.display =
                                    "block";

                                encontrou = true;

                            } else {

                                produto.style.display =
                                    "none";

                            }

                        }
                    );


                    // Vai para a área de produtos

                    const produtosSection =
                        document.getElementById("produtos");


                    if (produtosSection) {

                        produtosSection.scrollIntoView({
                            behavior: "smooth"
                        });

                    }


                    // Caso não existam produtos

                    if (!encontrou) {

                        alert(
                            "Ainda não existem produtos cadastrados nesta categoria."
                        );

                    }

                }
            );

        }
    );


    // ==========================================
    // VER TODOS OS PRODUTOS
    // ==========================================

    if (btnVerTodos) {

        btnVerTodos.addEventListener(
            "click",
            function () {

                produtos.forEach(
                    function (produto) {

                        produto.style.display =
                            "block";

                    }
                );


                if (campoPesquisa) {

                    campoPesquisa.value = "";

                }


                const produtosSection =
                    document.getElementById("produtos");


                if (produtosSection) {

                    produtosSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    // ==========================================
    // PRODUTOS
    // ==========================================

    botoesProduto.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    const nomeProduto =
                        botao.dataset.produto;


                    alert(
                        "Produto selecionado:\n\n" +
                        nomeProduto +
                        "\n\n" +
                        "A tela de detalhes e negociação será desenvolvida nas próximas etapas."
                    );

                }
            );

        }
    );


    // ==========================================
    // LOJAS / EMPRESAS
    // ==========================================
    //
    // Esta parte prepara o Dashboard
    // para abrir a próxima tela:
    //
    // perfil_empresa.html
    //
    // Exemplo:
    // perfil_empresa.html?loja=Tech%20Store
    //
    // ==========================================

    botoesLoja.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    const loja =
                        botao.dataset.loja;


                    if (!loja) {

                        alert(
                            "Não foi possível identificar a loja."
                        );

                        return;

                    }


                    // Abre o perfil da empresa

                    window.location.href =
                        "./perfil_empresa.html?loja=" +
                        encodeURIComponent(loja);

                }
            );

        }
    );


    // ==========================================
    // VOLTAR AO INÍCIO
    // ==========================================

    if (btnVoltarInicio) {

        btnVoltarInicio.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    // ==========================================
    // TECLA ESC
    // FECHA O MODAL DE LOGIN
    // ==========================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modalLogin
            ) {

                modalLogin.classList.remove("aberto");

            }

        }
    );


    // ==========================================
    // MENSAGEM DE TESTE
    // ==========================================

    console.log(
        "ENGAJA - Dashboard carregado corretamente."
    );

});