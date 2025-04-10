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

/* index.html.twig */
class __TwigTemplate_2e7051d53f25af069cf3b68bec8403b12092dfeb1dfbd40c79a2a9e5603f4f73 extends Template
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
        yield "<!DOCTYPE html>
<html lang=\"ca\">
<head>
    <meta charset=\"UTF-8\">
    <title>Llistat d'Anuncis</title>  <!-- Título de la página -->
</head>
<body>
    <h1>Llistat d'Anuncis</h1>

    ";
        // line 10
        if (CoreExtension::getAttribute($this->env, $this->source, ($context["session"] ?? null), "usuari_id", [], "any", false, false, false, 10)) {
            yield "  <!-- Verifica si hay un usuario en sesión -->
        <h2>Benvingut/da, ";
            // line 11
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["session"] ?? null), "nom", [], "any", false, false, false, 11), "html", null, true);
            yield "!</h2>  <!-- Muestra el nombre del usuario -->
        ";
            // line 12
            if ((CoreExtension::getAttribute($this->env, $this->source, ($context["session"] ?? null), "rol", [], "any", false, false, false, 12) == "admin")) {
                yield "  <!-- Verifica si el usuario es admin -->
            <a href=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=crear-anunci\">
                Fes click aquí per a crear un anunci!
            </a><br>  <!-- Enlace para crear un nuevo anuncio -->
        ";
            }
            // line 17
            yield "            <a href=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=logout\">
                Tancar la sessió
            </a>  <!-- Enlace para cerrar sesión -->
    ";
        } else {
            // line 21
            yield "        <p><a href=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=login\">Inicia sessió</a> per crear un anunci.</p>  <!-- Enlace para iniciar sesión -->
    ";
        }
        // line 23
        yield "
    <p>";
        // line 24
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["session"] ?? null), "message", [], "any", false, false, false, 24), "html", null, true);
        yield "</p>  <!-- Muestra un mensaje de sesión si existe -->

    <!-- Listado de anuncios -->
    <ul>
        ";
        // line 28
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(($context["anuncis"] ?? null));
        $context['_iterated'] = false;
        foreach ($context['_seq'] as $context["_key"] => $context["anunci"]) {
            yield "  <!-- Recorre todos los anuncios -->
            <li>
                <h2>";
            // line 30
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "titol", [], "any", false, false, false, 30), "html", null, true);
            yield "</h2>  <!-- Título del anuncio -->
                <p>";
            // line 31
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "descripcio", [], "any", false, false, false, 31), "html", null, true);
            yield "</p>  <!-- Descripción del anuncio -->
                <p>Preu: ";
            // line 32
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "preu", [], "any", false, false, false, 32), "html", null, true);
            yield " €</p>  <!-- Precio del anuncio -->
                <p>Categoria: ";
            // line 33
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "categoria", [], "any", false, false, false, 33), "html", null, true);
            yield "</p>  <!-- Categoría del anuncio -->
                <p>Publicat per l'usuari amb id: ";
            // line 34
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "usuari_id", [], "any", false, false, false, 34), "html", null, true);
            yield "</p>  <!-- ID del usuario que creó el anuncio -->
                <p>Data: ";
            // line 35
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Twig\Extension\CoreExtension']->formatDate(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "data_publicacio", [], "any", false, false, false, 35), "d/m/Y H:i"), "html", null, true);
            yield "</p>  <!-- Fecha de publicación del anuncio -->

                ";
            // line 37
            if ((CoreExtension::getAttribute($this->env, $this->source, ($context["session"] ?? null), "rol", [], "any", false, false, false, 37) == "admin")) {
                yield "  <!-- Verifica si el usuario es admin -->
                    <a href=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=modificar&id=";
                // line 38
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "id", [], "any", false, false, false, 38), "html", null, true);
                yield "\">Modificar</a>  <!-- Enlace para modificar el anuncio -->
                    <a href=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=eliminar&id=";
                // line 39
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "id", [], "any", false, false, false, 39), "html", null, true);
                yield "\">Eliminar</a>  <!-- Enlace para eliminar el anuncio -->
                ";
            }
            // line 41
            yield "            </li>
        ";
            $context['_iterated'] = true;
        }
        // line 44
        if (!$context['_iterated']) {
            // line 43
            yield "            <li>No hi ha anuncis disponibles.</li>  <!-- Mensaje si no hay anuncios -->
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['anunci'], $context['_parent'], $context['_iterated']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 45
        yield "    </ul>
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
        return "index.html.twig";
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
        return array (  149 => 45,  142 => 43,  140 => 44,  135 => 41,  130 => 39,  126 => 38,  122 => 37,  117 => 35,  113 => 34,  109 => 33,  105 => 32,  101 => 31,  97 => 30,  89 => 28,  82 => 24,  79 => 23,  75 => 21,  69 => 17,  61 => 12,  57 => 11,  53 => 10,  42 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("<!DOCTYPE html>
<html lang=\"ca\">
<head>
    <meta charset=\"UTF-8\">
    <title>Llistat d'Anuncis</title>  <!-- Título de la página -->
</head>
<body>
    <h1>Llistat d'Anuncis</h1>

    {% if session.usuari_id %}  <!-- Verifica si hay un usuario en sesión -->
        <h2>Benvingut/da, {{ session.nom }}!</h2>  <!-- Muestra el nombre del usuario -->
        {% if session.rol == 'admin' %}  <!-- Verifica si el usuario es admin -->
            <a href=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=crear-anunci\">
                Fes click aquí per a crear un anunci!
            </a><br>  <!-- Enlace para crear un nuevo anuncio -->
        {% endif %}
            <a href=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=logout\">
                Tancar la sessió
            </a>  <!-- Enlace para cerrar sesión -->
    {% else %}
        <p><a href=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=login\">Inicia sessió</a> per crear un anunci.</p>  <!-- Enlace para iniciar sesión -->
    {% endif %}

    <p>{{ session.message }}</p>  <!-- Muestra un mensaje de sesión si existe -->

    <!-- Listado de anuncios -->
    <ul>
        {% for anunci in anuncis %}  <!-- Recorre todos los anuncios -->
            <li>
                <h2>{{ anunci.titol }}</h2>  <!-- Título del anuncio -->
                <p>{{ anunci.descripcio }}</p>  <!-- Descripción del anuncio -->
                <p>Preu: {{ anunci.preu }} €</p>  <!-- Precio del anuncio -->
                <p>Categoria: {{ anunci.categoria }}</p>  <!-- Categoría del anuncio -->
                <p>Publicat per l'usuari amb id: {{ anunci.usuari_id }}</p>  <!-- ID del usuario que creó el anuncio -->
                <p>Data: {{ anunci.data_publicacio|date('d/m/Y H:i') }}</p>  <!-- Fecha de publicación del anuncio -->

                {% if session.rol == 'admin' %}  <!-- Verifica si el usuario es admin -->
                    <a href=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=modificar&id={{ anunci.id }}\">Modificar</a>  <!-- Enlace para modificar el anuncio -->
                    <a href=\"/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=eliminar&id={{ anunci.id }}\">Eliminar</a>  <!-- Enlace para eliminar el anuncio -->
                {% endif %}
            </li>
        {% else %}
            <li>No hi ha anuncis disponibles.</li>  <!-- Mensaje si no hay anuncios -->
        {% endfor %}
    </ul>
</body>
</html>
", "index.html.twig", "C:\\xampp\\htdocs\\MP07UF2PROJ_Abad-Beatriz\\views\\index.html.twig");
    }
}
