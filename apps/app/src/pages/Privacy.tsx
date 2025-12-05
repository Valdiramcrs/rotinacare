export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Política de Privacidade</h1>
        <p className="text-sm text-gray-500 mb-8">Última atualização: 05 de dezembro de 2025</p>

        <div className="prose prose-indigo max-w-none">
          <p>
            Bem-vindo à Política de Privacidade do RotinaCare. A sua privacidade é de extrema importância para nós. 
            Este documento descreve como coletamos, usamos, armazenamos, tratamos e protegemos os seus dados pessoais 
            ao utilizar nosso aplicativo e serviços.
          </p>
          <p>
            Ao utilizar o RotinaCare, você concorda com a coleta e uso de informações de acordo com esta política.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Definições</h2>
          <ul>
            <li><strong>Aplicativo:</strong> Refere-se ao software RotinaCare, disponível para dispositivos móveis e web.</li>
            <li><strong>Usuário:</strong> Qualquer pessoa que utilize o Aplicativo, incluindo Pacientes, Profissionais de Saúde e Administradores.</li>
            <li><strong>Dados Pessoais:</strong> Informações relacionadas a uma pessoa natural identificada ou identificável.</li>
            <li><strong>Dados Pessoais Sensíveis:</strong> Dados sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico, quando vinculado a uma pessoa natural.</li>
            <li><strong>LGPD:</strong> Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Coleta de Dados</h2>
          <p>Coletamos diferentes tipos de informações para fornecer e melhorar nosso serviço para você.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.1. Dados Fornecidos pelo Usuário</h3>
          <ul>
            <li><strong>Informações de Cadastro:</strong> Nome completo, e-mail, senha, data de nascimento, gênero e informações de contato.</li>
            <li><strong>Informações de Perfil:</strong> Foto de perfil, especialidade (para profissionais), CRM e outras informações que você optar por adicionar.</li>
            <li><strong>Dados de Saúde (Pacientes):</strong> Histórico de medicamentos, exames, consultas, diagnósticos, alergias e outras informações de saúde que você registrar no aplicativo.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.2. Dados Coletados Automaticamente</h3>
          <ul>
            <li><strong>Dados de Uso:</strong> Informações sobre como você utiliza o aplicativo, como funcionalidades acessadas, horários de uso e interações.</li>
            <li><strong>Dados do Dispositivo:</strong> Endereço IP, tipo de dispositivo, sistema operacional, identificadores únicos de dispositivo e informações de rede.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.3. Dados de Fontes de Terceiros</h3>
          <ul>
            <li><strong>Google (OAuth):</strong> Se você optar por se cadastrar ou fazer login usando sua conta Google, coletaremos seu nome, e-mail e foto de perfil, conforme autorizado por você na tela de consentimento do Google.</li>
            <li><strong>Google Calendar:</strong> Se você optar por integrar sua agenda, teremos acesso para ler e escrever eventos em seu Google Calendar para sincronizar suas consultas e lembretes.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Uso dos Dados</h2>
          <p>Utilizamos os dados coletados para as seguintes finalidades:</p>
          <ul>
            <li><strong>Fornecer e Manter o Serviço:</strong> Operar e manter o aplicativo, incluindo autenticação de usuários e personalização da experiência.</li>
            <li><strong>Gerenciamento de Saúde:</strong> Permitir que pacientes registrem e gerenciem suas informações de saúde e que profissionais de saúde acessem os dados de seus pacientes (com consentimento).</li>
            <li><strong>Comunicação:</strong> Enviar notificações, lembretes de consultas e medicamentos, atualizações sobre o serviço e responder às suas solicitações de suporte.</li>
            <li><strong>Melhoria do Serviço:</strong> Analisar dados de uso para entender como nossos usuários interagem com o aplicativo e identificar áreas para melhoria.</li>
            <li><strong>Segurança:</strong> Monitorar e prevenir atividades fraudulentas, abusivas ou que violem nossos Termos de Serviço.</li>
            <li><strong>Obrigações Legais:</strong> Cumprir com obrigações legais e regulatórias aplicáveis.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Compartilhamento de Dados</h2>
          <p>Nós não vendemos seus dados pessoais. O compartilhamento de informações ocorre apenas nas seguintes circunstâncias:</p>
          <ul>
            <li><strong>Com Profissionais de Saúde:</strong> Pacientes podem compartilhar seus dados de saúde com profissionais de saúde de sua escolha dentro da plataforma.</li>
            <li><strong>Com o seu Consentimento:</strong> Podemos compartilhar seus dados com terceiros quando tivermos seu consentimento explícito para fazê-lo.</li>
            <li><strong>Prestadores de Serviço:</strong> Compartilhamos informações com empresas que nos auxiliam na operação do serviço, como provedores de hospedagem (Railway, Vercel), banco de dados (Supabase) e serviços de e-mail.</li>
            <li><strong>Por Obrigação Legal:</strong> Podemos divulgar seus dados se formos obrigados por lei, intimação ou outra solicitação legal.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Armazenamento e Segurança dos Dados</h2>
          <p>
            Seus dados são armazenados em servidores seguros, localizados em provedores de nuvem de renome internacional. 
            Adotamos as melhores práticas de segurança para proteger seus dados contra acesso, alteração, divulgação ou destruição não autorizada, incluindo:
          </p>
          <ul>
            <li><strong>Criptografia:</strong> Seus dados são criptografados em trânsito (TLS/SSL) e em repouso.</li>
            <li><strong>Controle de Acesso:</strong> O acesso aos dados é restrito a funcionários e prestadores de serviço autorizados.</li>
            <li><strong>Monitoramento:</strong> Monitoramos continuamente nossos sistemas em busca de vulnerabilidades e ataques.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Seus Direitos como Titular dos Dados</h2>
          <p>De acordo com a LGPD, você tem o direito de:</p>
          <ul>
            <li>Confirmar a existência de tratamento de seus dados.</li>
            <li>Acessar seus dados.</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
            <li>Anonimizar, bloquear ou eliminar dados desnecessários.</li>
            <li>Solicitar a portabilidade dos seus dados.</li>
            <li>Eliminar os dados pessoais tratados com o seu consentimento.</li>
            <li>Revogar o consentimento a qualquer momento.</li>
          </ul>
          <p>Para exercer seus direitos, entre em contato conosco através do e-mail: <strong>contato@valdiramcassimiro.com</strong>.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Retenção de Dados</h2>
          <p>
            Manteremos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, 
            incluindo para fins de cumprimento de quaisquer obrigações legais, contratuais, de prestação de contas ou requisição de autoridades competentes.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Política de Cookies</h2>
          <p>
            Utilizamos cookies e tecnologias de rastreamento semelhantes para autenticação e para manter sua sessão ativa. 
            Você pode instruir seu navegador a recusar todos os cookies, mas algumas partes do nosso serviço podem não funcionar corretamente.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Alterações a Esta Política de Privacidade</h2>
          <p>
            Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações, 
            publicando a nova Política de Privacidade nesta página e atualizando a data da "Última atualização" no topo deste documento.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Contato</h2>
          <p>Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:</p>
          <ul>
            <li><strong>E-mail:</strong> contato@valdiramcassimiro.com</li>
            <li><strong>Site:</strong> <a href="https://rotinacare.com" className="text-indigo-600 hover:underline">https://rotinacare.com</a></li>
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <a href="/" className="text-indigo-600 hover:underline">← Voltar para o início</a>
        </div>
      </div>
    </div>
  );
}
