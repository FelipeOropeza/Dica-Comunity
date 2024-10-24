import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        {/* Informações de contato */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
          <p className="text-gray-400">
            Email:{" "}
            <a
              href="mailto:felipe2006.co@gmail.com"
              tabIndex="-1"
              className="text-blue-500 hover:underline"
            >
              felipe2006.co@gmail.com
            </a>
          </p>
          <p className="text-gray-400">
            Telefone:{" "}
            <a
              href="tel:+5511911844044"
              tabIndex="-1"
              className="text-blue-500 hover:underline"
            >
              (11) 91184-4044
            </a>
          </p>
          <p className="text-gray-400">
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/felipeoropeza"
              className="text-blue-500 hover:underline"
              target="_blank"
              tabIndex="-1"
              rel="noopener noreferrer"
            >
              www.linkedin.com/in/felipeoropeza
            </a>
          </p>
          <p className="text-gray-400">
            GitHub:{" "}
            <a
              href="https://github.com/FelipeOropeza"
              className="text-blue-500 hover:underline"
              tabIndex="-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/FelipeOropeza
            </a>
          </p>
        </div>

        {/* Direitos autorais */}
        <div className="mt-4 text-gray-500 text-sm">
          © {new Date().getFullYear()} Felipe Oropeza. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
