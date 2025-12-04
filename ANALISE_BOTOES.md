# Análise dos Botões - Código de Referência

## Código HTML de Referência

```html
<a 
  href="..." 
  data-slot="button" 
  class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md has-[>svg]:px-4 text-lg px-8"
>
  Começar Gratuitamente
  <svg>...</svg>
</a>
```

## Classes Importantes Identificadas

### Cores e Fundo:
- `bg-primary` - Fundo primário (ao invés de `bg-blue-600`)
- `text-primary-foreground` - Texto do botão primário (ao invés de `text-white`)
- `hover:bg-primary/90` - Hover state (ao invés de `hover:bg-blue-700`)

### Tamanho e Espaçamento:
- `h-10` - Altura do botão
- `px-8` - Padding horizontal
- `text-lg` - Tamanho do texto

### Ícone:
- `ml-2 h-5 w-5` - Classes do ícone de seta

## Problema Atual

Os botões estão usando classes hardcoded:
- `bg-blue-600 hover:bg-blue-700` 

Devem usar as variáveis CSS do sistema de design:
- `bg-primary text-primary-foreground hover:bg-primary/90`

## Correção Necessária

Substituir todas as ocorrências de:
- `bg-blue-600 hover:bg-blue-700` → `bg-primary text-primary-foreground hover:bg-primary/90`
- Verificar se o componente Button do @rotinacare/ui já aplica essas classes por padrão
