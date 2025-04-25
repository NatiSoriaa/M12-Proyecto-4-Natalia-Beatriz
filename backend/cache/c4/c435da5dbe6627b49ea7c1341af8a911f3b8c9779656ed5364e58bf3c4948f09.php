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

/* usuari/login.html.twig */
class __TwigTemplate_54c72fc75fe7b7737fb66b69b9fd03bd26c9438e73da0ba85c9d021e28ee7445 extends Template
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
        yield "<!DOCTYPE html>
<html lang=\"ca\">
<head>
    <meta charset=\"UTF-8\">
    <title>Inici de Sessió</title>
</head>
<body>
    <h1>Inici de Sessió</h1>
    <form method=\"POST\" action=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=login\">
        <label for=\"email\">Email:</label>
        <input type=\"email\" name=\"email\" required><br>

        <label for=\"contrasenya\">Contrasenya:</label>
        <input type=\"password\" name=\"contrasenya\" required><br>

        <button type=\"submit\">Iniciar Sessió</button>
    </form>
    <p>Encara no tens compte? <a href=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=registre\">Registra't aquí</a>.</p>
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
        return "usuari/login.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo(): array
    {
        return array (  42 => 2,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{# views/usuari/login.html #}
<!DOCTYPE html>
<html lang=\"ca\">
<head>
    <meta charset=\"UTF-8\">
    <title>Inici de Sessió</title>
</head>
<body>
    <h1>Inici de Sessió</h1>
    <form method=\"POST\" action=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=login\">
        <label for=\"email\">Email:</label>
        <input type=\"email\" name=\"email\" required><br>

        <label for=\"contrasenya\">Contrasenya:</label>
        <input type=\"password\" name=\"contrasenya\" required><br>

        <button type=\"submit\">Iniciar Sessió</button>
    </form>
    <p>Encara no tens compte? <a href=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=registre\">Registra't aquí</a>.</p>
</body>
</html>

", "usuari/login.html.twig", "C:\\xampp\\htdocs\\M12-Proyecto-4-Natalia-Beatriz\\backend\\views\\usuari\\login.html.twig");
    }
}
