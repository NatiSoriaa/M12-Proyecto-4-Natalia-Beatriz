<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;
use Twig\TemplateWrapper;

/* anunci/modificar.html.twig */
class __TwigTemplate_2c03f6a8c4cb45e7ee4ed688b0e58ab92559884dccb15b6bdf34abf6d809e527 extends Template
{
    private Source $source;
    /**
     * @var array<string, Template>
     */
    private array $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        // line 2
        yield "
<!DOCTYPE html>
<html lang=\"ca\">
<head>
    <meta charset=\"UTF-8\">
    <title>Modificar Anunci</title>  <!-- Título de la página -->
</head>
<body>
    <h1>Modificar Anunci</h1>
    <!-- Formulario para modificar un anuncio -->
    <form action=\"\" method=\"POST\">
        <label for=\"titol\">Títol:</label>
        <input type=\"text\" name=\"titol\" id=\"titol\" value=\"";
        // line 14
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["anunci"] ?? null), "titol", [], "any", false, false, false, 14), "html", null, true);
        yield "\" required>  <!-- Título actual del anuncio -->

        <label for=\"descripcio\">Descripció:</label>
        <textarea name=\"descripcio\" id=\"descripcio\" required>";
        // line 17
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["anunci"] ?? null), "descripcio", [], "any", false, false, false, 17), "html", null, true);
        yield "</textarea>  <!-- Descripción actual del anuncio -->

        <label for=\"preu\">Preu:</label>
        <input type=\"number\" name=\"preu\" id=\"preu\" value=\"";
        // line 20
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["anunci"] ?? null), "preu", [], "any", false, false, false, 20), "html", null, true);
        yield "\" required>  <!-- Precio actual del anuncio -->

        <label for=\"categoria\">Categoria:</label>
        <input type=\"text\" name=\"categoria\" id=\"categoria\" value=\"";
        // line 23
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["anunci"] ?? null), "categoria", [], "any", false, false, false, 23), "html", null, true);
        yield "\" required>  <!-- Categoría actual del anuncio -->

        <button type=\"submit\">Modificar</button>  <!-- Botón para enviar el formulario -->
    </form>
</body>
</html>
";
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "anunci/modificar.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable(): bool
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo(): array
    {
        return array (  74 => 23,  68 => 20,  62 => 17,  56 => 14,  42 => 2,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{# views/anunci/modificar.html.twig #}

<!DOCTYPE html>
<html lang=\"ca\">
<head>
    <meta charset=\"UTF-8\">
    <title>Modificar Anunci</title>  <!-- Título de la página -->
</head>
<body>
    <h1>Modificar Anunci</h1>
    <!-- Formulario para modificar un anuncio -->
    <form action=\"\" method=\"POST\">
        <label for=\"titol\">Títol:</label>
        <input type=\"text\" name=\"titol\" id=\"titol\" value=\"{{ anunci.titol }}\" required>  <!-- Título actual del anuncio -->

        <label for=\"descripcio\">Descripció:</label>
        <textarea name=\"descripcio\" id=\"descripcio\" required>{{ anunci.descripcio }}</textarea>  <!-- Descripción actual del anuncio -->

        <label for=\"preu\">Preu:</label>
        <input type=\"number\" name=\"preu\" id=\"preu\" value=\"{{ anunci.preu }}\" required>  <!-- Precio actual del anuncio -->

        <label for=\"categoria\">Categoria:</label>
        <input type=\"text\" name=\"categoria\" id=\"categoria\" value=\"{{ anunci.categoria }}\" required>  <!-- Categoría actual del anuncio -->

        <button type=\"submit\">Modificar</button>  <!-- Botón para enviar el formulario -->
    </form>
</body>
</html>
", "anunci/modificar.html.twig", "C:\\xampp\\htdocs\\MP07UF2PROJ_Abad-Beatriz\\views\\anunci\\modificar.html.twig");
    }
}
