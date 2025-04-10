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

/* anunci/crear.html */
class __TwigTemplate_fce26599709962588c9bd21132c08c0a2767757bc1b802a606834cc5421805d1 extends Template
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
    <title>Crear Anunci</title>
</head>
<body>
    <h1>Crear Anunci</h1>
    <form method=\"POST\" action=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=crear-anunci\">
        <label for=\"titol\">Títol:</label>
        <input type=\"text\" name=\"titol\" required><br>

        <label for=\"descripcio\">Descripció:</label>
        <textarea name=\"descripcio\" required></textarea><br>

        <label for=\"preu\">Preu:</label>
        <input type=\"number\" name=\"preu\" step=\"0.01\" required><br>

        <label for=\"categoria\">Categoria:</label>
        <input type=\"text\" name=\"categoria\" required><br>

        <button type=\"submit\">Publicar Anunci</button>
    </form>
    <p><a href=\"../views/index.html.twig\">Tornar al llistat d'anuncis</a></p>
</body>
</html>";
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "anunci/crear.html";
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
        return new Source("{# views/anunci/crear.html #}
<!DOCTYPE html>
<html lang=\"ca\">
<head>
    <meta charset=\"UTF-8\">
    <title>Crear Anunci</title>
</head>
<body>
    <h1>Crear Anunci</h1>
    <form method=\"POST\" action=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=crear-anunci\">
        <label for=\"titol\">Títol:</label>
        <input type=\"text\" name=\"titol\" required><br>

        <label for=\"descripcio\">Descripció:</label>
        <textarea name=\"descripcio\" required></textarea><br>

        <label for=\"preu\">Preu:</label>
        <input type=\"number\" name=\"preu\" step=\"0.01\" required><br>

        <label for=\"categoria\">Categoria:</label>
        <input type=\"text\" name=\"categoria\" required><br>

        <button type=\"submit\">Publicar Anunci</button>
    </form>
    <p><a href=\"../views/index.html.twig\">Tornar al llistat d'anuncis</a></p>
</body>
</html>", "anunci/crear.html", "C:\\xampp\\htdocs\\exercicis MP07\\MP07UF2PROJ_Abad-Beatriz\\views\\anunci\\crear.html");
    }
}
