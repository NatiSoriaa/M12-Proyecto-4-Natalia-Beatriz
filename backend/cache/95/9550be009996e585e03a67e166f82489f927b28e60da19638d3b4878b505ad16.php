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
class __TwigTemplate_f86c5665420d6eeaf3b0f4bbbc9080a497acf658aa2d2d38f3400f20a9578b47 extends Template
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
    <title>Login / Register</title>
    <link rel=\"stylesheet\" href=\"/MP07UF2PROJ_Abad-Beatriz/public/css/style.css\">
</head>
<body>

    <!-- Botón para mostrar el modal -->
    <button id=\"modal-button\"></button>

    <!-- Modal de Login y Registro -->
    <div id=\"loginModal\" class=\"modal\">
        <div class=\"modal-content\">
            <span class=\"close\" onclick=\"closeModal()\">&times;</span>

            <!-- Botones para alternar entre Register y Login -->
            <div class=\"toggle-buttons\">
                <button id=\"showRegister\" class=\"active\">Register</button>
                <button id=\"showLogin\" class=\"inactive\">Login</button>
            </div>

            <!-- Formulario de Login -->
            <div id=\"loginUser\" class=\"form-container inactive\">
                <form id=\"loginForm\">
                    <label for=\"log-user\">Username:</label>
                    <input type=\"text\" id=\"log-user\" name=\"username\" placeholder=\"Enter your username\" required>
                    <br><br>
                    <label for=\"log-passw\">Password:</label>
                    <input type=\"password\" id=\"log-passw\" name=\"password\" placeholder=\"Enter your password\" required>
                    <br><br>
                    <button type=\"submit\" class=\"modal-button\">Login</button>
                </form>
            </div>

            <!-- Formulario de Register -->
            <div id=\"registerUser\" class=\"form-container active\">
                <form id=\"registerForm\">
                    <label for=\"reg-user\">Username:</label>
                    <input type=\"text\" id=\"reg-user\" name=\"username\" placeholder=\"Enter your username\" required>
                    <br><br>
                    <label for=\"reg-email\">Email:</label>
                    <input type=\"email\" id=\"reg-email\" name=\"email\" placeholder=\"Enter your email\" required>
                    <br><br>
                    <label for=\"reg-passw\">Password:</label>
                    <input type=\"password\" id=\"reg-passw\" name=\"password\" placeholder=\"Enter your password\" required>
                    <br><br>
                    <button type=\"submit\" class=\"modal-button\">Register</button>
                </form>
            </div>
        </div>
    </div>

    <script type=\"module\" src=\"/MP07UF2PROJ_Abad-Beatriz/public/js/register.js\"></script>
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
        return new Source("<!DOCTYPE html>
<html lang=\"ca\">
<head>
    <meta charset=\"UTF-8\">
    <title>Login / Register</title>
    <link rel=\"stylesheet\" href=\"/MP07UF2PROJ_Abad-Beatriz/public/css/style.css\">
</head>
<body>

    <!-- Botón para mostrar el modal -->
    <button id=\"modal-button\"></button>

    <!-- Modal de Login y Registro -->
    <div id=\"loginModal\" class=\"modal\">
        <div class=\"modal-content\">
            <span class=\"close\" onclick=\"closeModal()\">&times;</span>

            <!-- Botones para alternar entre Register y Login -->
            <div class=\"toggle-buttons\">
                <button id=\"showRegister\" class=\"active\">Register</button>
                <button id=\"showLogin\" class=\"inactive\">Login</button>
            </div>

            <!-- Formulario de Login -->
            <div id=\"loginUser\" class=\"form-container inactive\">
                <form id=\"loginForm\">
                    <label for=\"log-user\">Username:</label>
                    <input type=\"text\" id=\"log-user\" name=\"username\" placeholder=\"Enter your username\" required>
                    <br><br>
                    <label for=\"log-passw\">Password:</label>
                    <input type=\"password\" id=\"log-passw\" name=\"password\" placeholder=\"Enter your password\" required>
                    <br><br>
                    <button type=\"submit\" class=\"modal-button\">Login</button>
                </form>
            </div>

            <!-- Formulario de Register -->
            <div id=\"registerUser\" class=\"form-container active\">
                <form id=\"registerForm\">
                    <label for=\"reg-user\">Username:</label>
                    <input type=\"text\" id=\"reg-user\" name=\"username\" placeholder=\"Enter your username\" required>
                    <br><br>
                    <label for=\"reg-email\">Email:</label>
                    <input type=\"email\" id=\"reg-email\" name=\"email\" placeholder=\"Enter your email\" required>
                    <br><br>
                    <label for=\"reg-passw\">Password:</label>
                    <input type=\"password\" id=\"reg-passw\" name=\"password\" placeholder=\"Enter your password\" required>
                    <br><br>
                    <button type=\"submit\" class=\"modal-button\">Register</button>
                </form>
            </div>
        </div>
    </div>

    <script type=\"module\" src=\"/MP07UF2PROJ_Abad-Beatriz/public/js/register.js\"></script>
</body>
</html>
", "usuari/registre.html.twig", "C:\\xampp\\htdocs\\MP07UF2PROJ_Abad-Beatriz\\views\\usuari\\registre.html.twig");
    }
}
