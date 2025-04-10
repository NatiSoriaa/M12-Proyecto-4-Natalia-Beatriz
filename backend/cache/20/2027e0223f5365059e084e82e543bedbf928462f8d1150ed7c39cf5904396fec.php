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
class __TwigTemplate_6922e8ee33ecc3b633a80bfcca5f5fb60bb5e6126189cb6c9d13ddf471af8e1d extends Template
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
    <title>Modificar Anunci</title>
</head>
<body>
    <h1>Modificar Anunci</h1>
    <form action=\"\" method=\"POST\">
        <label for=\"titol\">Títol:</label>
        <input type=\"text\" name=\"titol\" id=\"titol\" value=\"";
        // line 13
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["anunci"] ?? null), "titol", [], "any", false, false, false, 13), "html", null, true);
        yield "\" required>

        <label for=\"descripcio\">Descripció:</label>
        <textarea name=\"descripcio\" id=\"descripcio\" required>";
        // line 16
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["anunci"] ?? null), "descripcio", [], "any", false, false, false, 16), "html", null, true);
        yield "</textarea>

        <label for=\"preu\">Preu:</label>
        <input type=\"number\" name=\"preu\" id=\"preu\" value=\"";
        // line 19
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["anunci"] ?? null), "preu", [], "any", false, false, false, 19), "html", null, true);
        yield "\" required>

        <label for=\"categoria\">Categoria:</label>
        <input type=\"text\" name=\"categoria\" id=\"categoria\" value=\"";
        // line 22
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["anunci"] ?? null), "categoria", [], "any", false, false, false, 22), "html", null, true);
        yield "\" required>

        <button type=\"submit\">Modificar</button>
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
        return array (  73 => 22,  67 => 19,  61 => 16,  55 => 13,  42 => 2,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{# views/anunci/modificar.html #}

<!DOCTYPE html>
<html lang=\"ca\">
<head>
    <meta charset=\"UTF-8\">
    <title>Modificar Anunci</title>
</head>
<body>
    <h1>Modificar Anunci</h1>
    <form action=\"\" method=\"POST\">
        <label for=\"titol\">Títol:</label>
        <input type=\"text\" name=\"titol\" id=\"titol\" value=\"{{ anunci.titol }}\" required>

        <label for=\"descripcio\">Descripció:</label>
        <textarea name=\"descripcio\" id=\"descripcio\" required>{{ anunci.descripcio }}</textarea>

        <label for=\"preu\">Preu:</label>
        <input type=\"number\" name=\"preu\" id=\"preu\" value=\"{{ anunci.preu }}\" required>

        <label for=\"categoria\">Categoria:</label>
        <input type=\"text\" name=\"categoria\" id=\"categoria\" value=\"{{ anunci.categoria }}\" required>

        <button type=\"submit\">Modificar</button>
    </form>
</body>
</html>
", "anunci/modificar.html.twig", "C:\\xampp\\htdocs\\exercicis MP07\\MP07UF2PROJ_Abad-Beatriz\\views\\anunci\\modificar.html.twig");
    }
}
