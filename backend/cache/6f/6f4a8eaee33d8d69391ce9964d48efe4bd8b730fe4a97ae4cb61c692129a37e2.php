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

/* usuari/registre.html.twig */
class __TwigTemplate_62802e903d5b36cfa6647fad45d1719c55ce2ed46cf954f30b72d26bf97dd396 extends Template
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
        // line 1
        yield "<!-- views/usuari/registre.php -->
<!DOCTYPE html>
<html lang=\"ca\">
<head>
    <meta charset=\"UTF-8\">
    <title>Registre</title>
</head>
<body>
    <h1>Registre</h1>
    <form method=\"POST\" action=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=registre\">
        <label for=\"nom\">Nom:</label>
        <input type=\"text\" name=\"nom\" required><br>

        <label for=\"email\">Email:</label>
        <input type=\"email\" name=\"email\" required><br>

        <label for=\"contrasenya\">Contrasenya:</label>
        <input type=\"password\" name=\"contrasenya\" required><br>

        <button type=\"submit\">Registrar-se</button>
    </form>
    <p>Ja tens un compte? <a href=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=login\">Inicia sessió aquí</a>.</p>
</body>
</html>";
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "usuari/registre.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo(): array
    {
        return array (  42 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("<!-- views/usuari/registre.php -->
<!DOCTYPE html>
<html lang=\"ca\">
<head>
    <meta charset=\"UTF-8\">
    <title>Registre</title>
</head>
<body>
    <h1>Registre</h1>
    <form method=\"POST\" action=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=registre\">
        <label for=\"nom\">Nom:</label>
        <input type=\"text\" name=\"nom\" required><br>

        <label for=\"email\">Email:</label>
        <input type=\"email\" name=\"email\" required><br>

        <label for=\"contrasenya\">Contrasenya:</label>
        <input type=\"password\" name=\"contrasenya\" required><br>

        <button type=\"submit\">Registrar-se</button>
    </form>
    <p>Ja tens un compte? <a href=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=login\">Inicia sessió aquí</a>.</p>
</body>
</html>", "usuari/registre.html.twig", "C:\\xampp\\htdocs\\exercicis MP07\\MP07UF2PROJ_Abad-Beatriz\\views\\usuari\\registre.html.twig");
    }
}
