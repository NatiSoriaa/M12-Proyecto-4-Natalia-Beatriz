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
class __TwigTemplate_63c4b977ab7406def8f0bcc7804d771ae3c4023d8741a6142e59cb1ac80dfd01 extends Template
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
    <title>Llistat d'Anuncis</title>
</head>
<body>
    <h1>Llistat d'Anuncis</h1>

    ";
        // line 10
        if (CoreExtension::getAttribute($this->env, $this->source, ($context["session"] ?? null), "usuari_id", [], "any", false, false, false, 10)) {
            // line 11
            yield "        <h2>Benvingut/da, ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["session"] ?? null), "nom", [], "any", false, false, false, 11), "html", null, true);
            yield "!</h2>
        ";
            // line 12
            if ((CoreExtension::getAttribute($this->env, $this->source, ($context["session"] ?? null), "rol", [], "any", false, false, false, 12) == "admin")) {
                // line 13
                yield "            <a href=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=crear-anunci\">
                Fes click aquí per a crear un anunci!
            </a><br>
            
        ";
            }
            // line 18
            yield "            <a href=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=logout\">
                Tancar la sessió
            </a>
    ";
        } else {
            // line 22
            yield "        <p><a href=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=login\">Inicia sessió</a> per crear un anunci.</p>
    ";
        }
        // line 24
        yield "
    <p>";
        // line 25
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["session"] ?? null), "message", [], "any", false, false, false, 25), "html", null, true);
        yield "</p> 

    <ul>
        ";
        // line 28
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(($context["anuncis"] ?? null));
        $context['_iterated'] = false;
        foreach ($context['_seq'] as $context["_key"] => $context["anunci"]) {
            // line 29
            yield "            <li>
                <h2>";
            // line 30
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "titol", [], "any", false, false, false, 30), "html", null, true);
            yield "</h2>
                <p>";
            // line 31
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "descripcio", [], "any", false, false, false, 31), "html", null, true);
            yield "</p>
                <p>Preu: ";
            // line 32
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "preu", [], "any", false, false, false, 32), "html", null, true);
            yield " €</p>
                <p>Categoria: ";
            // line 33
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "categoria", [], "any", false, false, false, 33), "html", null, true);
            yield "</p>
                <p>Publicat per l'usuari amb id: ";
            // line 34
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "usuari_id", [], "any", false, false, false, 34), "html", null, true);
            yield "</p>
                <p>Data: ";
            // line 35
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Twig\Extension\CoreExtension']->formatDate(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "data_publicacio", [], "any", false, false, false, 35), "d/m/Y H:i"), "html", null, true);
            yield "</p>

                ";
            // line 37
            if ((CoreExtension::getAttribute($this->env, $this->source, ($context["session"] ?? null), "rol", [], "any", false, false, false, 37) == "admin")) {
                // line 38
                yield "                    <a href=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=modificar&id=";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "id", [], "any", false, false, false, 38), "html", null, true);
                yield "\">Modificar</a>
                    <a href=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=eliminar&id=";
                // line 39
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "id", [], "any", false, false, false, 39), "html", null, true);
                yield "\">Eliminar</a>
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
            yield "            <li>No hi ha anuncis disponibles.</li>
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
        return array (  147 => 45,  140 => 43,  138 => 44,  133 => 41,  128 => 39,  123 => 38,  121 => 37,  116 => 35,  112 => 34,  108 => 33,  104 => 32,  100 => 31,  96 => 30,  93 => 29,  88 => 28,  82 => 25,  79 => 24,  75 => 22,  69 => 18,  62 => 13,  60 => 12,  55 => 11,  53 => 10,  42 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("<!DOCTYPE html>
<html lang=\"ca\">
<head>
    <meta charset=\"UTF-8\">
    <title>Llistat d'Anuncis</title>
</head>
<body>
    <h1>Llistat d'Anuncis</h1>

    {% if session.usuari_id %}
        <h2>Benvingut/da, {{ session.nom }}!</h2>
        {% if session.rol == 'admin' %}
            <a href=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=crear-anunci\">
                Fes click aquí per a crear un anunci!
            </a><br>
            
        {% endif %}
            <a href=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=logout\">
                Tancar la sessió
            </a>
    {% else %}
        <p><a href=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=login\">Inicia sessió</a> per crear un anunci.</p>
    {% endif %}

    <p>{{ session.message }}</p> 

    <ul>
        {% for anunci in anuncis %}
            <li>
                <h2>{{ anunci.titol }}</h2>
                <p>{{ anunci.descripcio }}</p>
                <p>Preu: {{ anunci.preu }} €</p>
                <p>Categoria: {{ anunci.categoria }}</p>
                <p>Publicat per l'usuari amb id: {{ anunci.usuari_id }}</p>
                <p>Data: {{ anunci.data_publicacio|date('d/m/Y H:i') }}</p>

                {% if session.rol == 'admin' %}
                    <a href=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=modificar&id={{ anunci.id }}\">Modificar</a>
                    <a href=\"/exercicis%20MP07/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=eliminar&id={{ anunci.id }}\">Eliminar</a>
                {% endif %}
            </li>
        {% else %}
            <li>No hi ha anuncis disponibles.</li>
        {% endfor %}
    </ul>
</body>
</html>
", "index.html.twig", "C:\\xampp\\htdocs\\exercicis MP07\\MP07UF2PROJ_Abad-Beatriz\\views\\index.html.twig");
    }
}
