@AGENTS.md

@README.md

@SOUL.md

# Reglas de trabajo en este proyecto

Antes de escribir código, leer el README (estado, decisiones cerradas, lo que es
provisional) y el `SOUL.md` (identidad del producto).

**Gate de revisión obligatorio.** Ver `.claude/skills/engineering-review-gate/`.
Revisión del plan antes de implementar, revisión del diff real después. No dar
una fase por terminada sin ambas.

**Una fase a la vez.** Terminar, validar, reportar y parar. No encadenar fases
sin que el usuario lo pida.

**Costo cero.** Ninguna dependencia, API o servicio que cobre o que active un
medidor. Si algo lo requiere, plantearlo antes de implementarlo.

**Verificar, no afirmar.** No decir que algo funciona sin haberlo ejecutado. Si
una verificación falla, confirmar si falló el código o falló la prueba antes de
reportarlo como bug.

**Avisar cuando no haya cambio visible.** Una fase de solo datos o configuración
se ve idéntica en el navegador; decirlo antes de que el usuario lo pregunte.

**Idioma:** responder en español. El copy del producto va en los diccionarios
(`dictionaries/`), nunca escrito dentro de un componente.
