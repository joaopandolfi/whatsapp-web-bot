var __memory = {
    example :{
        pedindo:false,
        tradicional:false,
        especial: false,
        quantSabores: 0,
        sabores : [],
        tipo: "",
        atual: "",
        fluxo: [],
    }
}

var __pedidos = []
var __cancelados = []

var __tree = {
    seq:["default"],
    default:{
         msg:`
Olá, bem vindo a pizzaria do Tião 🍕🍕.
Confira nossos preços:
*Especiais*
Grande: R$ 45,90
Média: R$ 34,90
Pequena: R$ 25,00
*Tradicinais*
Grande: R$ 35,90
Média: R$ 24,90
Pequena: R$ 20,00

Para consultar nosso cardápio de sabores 🍕🍕, digite: *especiais* ou *tradicionais* 

Para fazer um pedido digite: *pedido*
`,
        resp:{
            pedido:"pedido"
        }

},

    sabor_tradicional : { msg:`
Nossos deliciosos sabores *tradicionais* são:
1. 🍕 Portuguesa
2. 🍕 Calabresa
3. 🍕 Mussarela
`,
    size:3,
    values:["🍕 Portuguesa","🍕 Calabresa","🍕 Mussarela"],
},

    sabor_especial :{ msg:`
Nossos deliciosos sabores *especiais* são:
1. 🍕 Baiana
2. 🍕 Pepperoni
3. 🍕 Quatro queijos
`,
    size: 3,
    values:["🍕 Baiana","🍕 Pepperoni","🍕 Quatro queijos"],
},


    pedido:{ msg:`
Que bom que você gostou dos nossos sabores!!!
Para continar, digite o tipo de pizza 🍕🍕: *especial* ou *tradicional*
`,},

    pedido_g:{ msg:`
Pizza {tipopedido}:
Se você quiser apenas um sabor, digite *1*
Para dois sabores digite: *2*
`,},

    pedido_g_1: { msg:`
Pizza *{tipopedido}*, 🍕 *1* sabor
Digite o número do sabor
`,},

    pedido_g_2: { msg:`
Pizza *{tipopedido}*, 🍕🍕 *2* sabores
Digite o número do primeiro sabor
`,},

    pedido_g_2_2: { msg:`
Pizza *{tipopedido}*, 🍕🍕 *2* sabores, {sabor1} 
Digite o número do segundo sabor`,
},

    confirma_pedido: { msg:`
Seu pedido:
{pedido}

Para ✅*confirmar*, digite *1*

Para ❌*cancelar*, digite *2*
`,},


    pedido_cancelado: { msg:`
Cancelamos o seu pedido
{pedido}

Agradecemos a preferencia, esperamos que volte para experimentar a 🍕 do Tião!
`,},


    endereco: { msg:`
Digite o seu endereço, ou mande sua localização pelo whatsapp`,
    },

    pedido_confirmado:{ msg:`
Obrigado por pedir na pizzaria to Tião!! 🍕🍕🍕🍕🍕
Seu pedido chegará em breve`,
},

}