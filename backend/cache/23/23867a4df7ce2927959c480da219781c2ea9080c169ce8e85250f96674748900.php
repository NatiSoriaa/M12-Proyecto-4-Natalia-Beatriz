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
class __TwigTemplate_8c482a99e716e959e233b4ec734110be36d1f1dc94c02c6ff10dc72e2771d07d extends Template
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
    <form method=\"POST\" action=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=login\">
        <label for=\"email\">Email:</label>
        <input type=\"email\" name=\"email\" required><br>

        <label for=\"contrasenya\">Contrasenya:</label>
        <input type=\"password\" name=\"contrasenya\" required><br>

        <button type=\"submit\">Iniciar Sessió</button>
    </form>
    <p>Encara no tens compte? <a href=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=registre\">Registra't aquí</a>.</p>
</body>
</html>";
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
    <form method=\"POST\" action=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=login\">
        <label for=\"email\">Email:</label>
        <input type=\"email\" name=\"email\" required><br>

        <label for=\"contrasenya\">Contrasenya:</label>
        <input type=\"password\" name=\"contrasenya\" required><br>

        <button type=\"submit\">Iniciar Sessió</button>
    </form>
    <p>Encara no tens compte? <a href=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=registre\">Registra't aquí</a>.</p>
</body>
</html>", "usuari/login.html.twig", "C:\\xampp\\htdocs\\exercicis MP07\\MP07UF2PROJ_Abad-Beatriz\\views\\usuari\\login.html.twig");
    }
}
