# Análise do Botão "Ver Demonstração"

## Código de Referência (Correto)

```html
<button 
  data-slot="button" 
  class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-transparent shadow-xs hover:bg-accent dark:bg-transparent dark:border-input dark:hover:bg-input/50 h-10 rounded-md has-[>svg]:px-4 text-lg px-8"
>
  Ver Demonstração
</button>
```

## Classes Importantes

### Botão "Ver Demonstração":
- `border` - Borda
- `bg-transparent` - Fundo transparente
- `shadow-xs` - Sombra extra pequena
- `hover:bg-accent` - Hover com cor accent
- `dark:bg-transparent` - Fundo transparente no dark mode
- `dark:border-input` - Borda input no dark mode
- `dark:hover:bg-input/50` - Hover no dark mode
- `h-10` - Altura
- `text-lg` - Tamanho do texto
- `px-8` - Padding horizontal

## Diferença do Código Atual

O código atual usa:
```tsx
<Button 
  size="lg" 
  variant="outline"
>
  Ver Demonstração
</Button>
```

Mas deveria usar as classes exatas do código de referência para garantir o estilo correto.

## Solução

Usar um `<button>` HTML puro com todas as classes do sistema de design ao invés do componente `Button` com variant="outline".

Ou verificar se o componente Button com variant="outline" já aplica essas classes automaticamente.
