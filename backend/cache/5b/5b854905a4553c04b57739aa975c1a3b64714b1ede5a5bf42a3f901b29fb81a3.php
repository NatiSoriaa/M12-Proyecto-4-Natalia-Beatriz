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

/* anunci/crear.html.twig */
class __TwigTemplate_657aac02899fe44dddf0353b38b872e78f74773d75f64030a67c9ad67c4ff59b extends Template
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
    <title>Crear Anunci</title>  <!-- Título de la página -->
</head>
<body>
    <h1>Crear Anunci</h1>
    <!-- Formulario para crear un anuncio -->
    <form method=\"POST\" action=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=crear-anunci\">
        <label for=\"titol\">Títol:</label>
        <input type=\"text\" name=\"titol\" required><br>  <!-- Título del anuncio -->

        <label for=\"descripcio\">Descripció:</label>
        <textarea name=\"descripcio\" required></textarea><br>  <!-- Descripción del anuncio -->

        <label for=\"preu\">Preu:</label>
        <input type=\"number\" name=\"preu\" step=\"0.01\" required><br>  <!-- Precio del anuncio -->

        <label for=\"categoria\">Categoria:</label>
        <input type=\"text\" name=\"categoria\" required><br>  <!-- Categoría del anuncio -->

        <button type=\"submit\">Publicar Anunci</button>  <!-- Botón para enviar el formulario -->
    </form>
    <p><a href=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=anuncis\">Tornar al llistat d'anuncis</a></p>  <!-- Enlace para volver a la lista de anuncios -->
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
        return "anunci/crear.html.twig";
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
        return new Source("{# views/anunci/crear.html.twig #}
<!DOCTYPE html>
<html lang=\"ca\">
<head>
    <meta charset=\"UTF-8\">
    <title>Crear Anunci</title>  <!-- Título de la página -->
</head>
<body>
    <h1>Crear Anunci</h1>
    <!-- Formulario para crear un anuncio -->
    <form method=\"POST\" action=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=crear-anunci\">
        <label for=\"titol\">Títol:</label>
        <input type=\"text\" name=\"titol\" required><br>  <!-- Título del anuncio -->

        <label for=\"descripcio\">Descripció:</label>
        <textarea name=\"descripcio\" required></textarea><br>  <!-- Descripción del anuncio -->

        <label for=\"preu\">Preu:</label>
        <input type=\"number\" name=\"preu\" step=\"0.01\" required><br>  <!-- Precio del anuncio -->

        <label for=\"categoria\">Categoria:</label>
        <input type=\"text\" name=\"categoria\" required><br>  <!-- Categoría del anuncio -->

        <button type=\"submit\">Publicar Anunci</button>  <!-- Botón para enviar el formulario -->
    </form>
    <p><a href=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=anuncis\">Tornar al llistat d'anuncis</a></p>  <!-- Enlace para volver a la lista de anuncios -->
</body>
</html>
", "anunci/crear.html.twig", "C:\\xampp\\htdocs\\MP07UF2PROJ_Abad-Beatriz\\views\\anunci\\crear.html.twig");
    }
}
