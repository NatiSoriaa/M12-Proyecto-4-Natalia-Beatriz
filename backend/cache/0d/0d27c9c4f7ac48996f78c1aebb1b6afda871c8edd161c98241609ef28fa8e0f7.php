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

/* anunci/llistat.html */
class __TwigTemplate_4bb4555b9bea7e3112ce4cf2b3c367c72f7b81a7396a4c591c1c35f36492cc88 extends Template
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
    <h1>Anuncis</h1>

    ";
        // line 10
        if (CoreExtension::getAttribute($this->env, $this->source, ($context["session"] ?? null), "usuari_id", [], "any", false, false, false, 10)) {
            // line 11
            yield "        <p>Benvingut/da, ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["session"] ?? null), "nom", [], "any", false, false, false, 11), "html", null, true);
            yield "! <a href=\"/logout\">Tanca sessió</a></p>
        <a href=\"../anunci/crear.html\">Crear un nou anunci</a>
    ";
        } else {
            // line 14
            yield "        <p><a href=\"/usuari/login.html\">Inicia sessió</a> per crear un anunci.</p>
    ";
        }
        // line 16
        yield "
    <ul>
        ";
        // line 18
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(($context["anuncis"] ?? null));
        $context['_iterated'] = false;
        foreach ($context['_seq'] as $context["_key"] => $context["anunci"]) {
            // line 19
            yield "            <li>
                <h2>";
            // line 20
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "titol", [], "any", false, false, false, 20), "html", null, true);
            yield "</h2>
                <p>";
            // line 21
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "descripcio", [], "any", false, false, false, 21), "html", null, true);
            yield "</p>
                <p>Preu: ";
            // line 22
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "preu", [], "any", false, false, false, 22), "html", null, true);
            yield " €</p>
                <p>Categoria: ";
            // line 23
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "categoria", [], "any", false, false, false, 23), "html", null, true);
            yield "</p>
                <p>Publicat per: ";
            // line 24
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "nom_usuari", [], "any", false, false, false, 24), "html", null, true);
            yield "</p>
                <p>Data: ";
            // line 25
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Twig\Extension\CoreExtension']->formatDate(CoreExtension::getAttribute($this->env, $this->source, $context["anunci"], "data_publicacio", [], "any", false, false, false, 25), "d/m/Y H:i"), "html", null, true);
            yield "</p>
            </li>
        ";
            $context['_iterated'] = true;
        }
        // line 29
        if (!$context['_iterated']) {
            // line 28
            yield "            <li>No hi ha anuncis disponibles.</li>
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['anunci'], $context['_parent'], $context['_iterated']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 30
        yield "    </ul>
</body>
</html>";
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "anunci/llistat.html";
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
        return array (  114 => 30,  107 => 28,  105 => 29,  98 => 25,  94 => 24,  90 => 23,  86 => 22,  82 => 21,  78 => 20,  75 => 19,  70 => 18,  66 => 16,  62 => 14,  55 => 11,  53 => 10,  42 => 1,);
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
    <h1>Anuncis</h1>

    {% if session.usuari_id %}
        <p>Benvingut/da, {{ session.nom }}! <a href=\"/logout\">Tanca sessió</a></p>
        <a href=\"../anunci/crear.html\">Crear un nou anunci</a>
    {% else %}
        <p><a href=\"/usuari/login.html\">Inicia sessió</a> per crear un anunci.</p>
    {% endif %}

    <ul>
        {% for anunci in anuncis %}
            <li>
                <h2>{{ anunci.titol }}</h2>
                <p>{{ anunci.descripcio }}</p>
                <p>Preu: {{ anunci.preu }} €</p>
                <p>Categoria: {{ anunci.categoria }}</p>
                <p>Publicat per: {{ anunci.nom_usuari }}</p>
                <p>Data: {{ anunci.data_publicacio|date('d/m/Y H:i') }}</p>
            </li>
        {% else %}
            <li>No hi ha anuncis disponibles.</li>
        {% endfor %}
    </ul>
</body>
</html>", "anunci/llistat.html", "C:\\xampp\\htdocs\\exercicis MP07\\MP07UF2PROJ_Abad-Beatriz\\views\\anunci\\llistat.html");
    }
}
