export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Termos de Serviço</h1>
        <p className="text-sm text-gray-500 mb-8">Última atualização: 05 de dezembro de 2025</p>

        <div className="prose prose-indigo max-w-none">
          <p>
            Bem-vindo ao RotinaCare. Estes Termos de Serviço ("Termos") regem o seu acesso e uso do nosso aplicativo e serviços. 
            Ao criar uma conta ou usar o RotinaCare, você concorda em cumprir estes Termos.
          </p>
          <p className="font-semibold">
            Leia este documento com atenção. Se você não concordar com estes Termos, não utilize nossos serviços.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar ou usar o aplicativo RotinaCare ("Serviço"), você firma um contrato vinculativo com o RotinaCare 
            e concorda em cumprir todas as leis e regulamentos aplicáveis. Você declara que tem idade legal para firmar este contrato.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Descrição do Serviço</h2>
          <p>
            O RotinaCare é uma plataforma de gerenciamento de saúde pessoal que permite aos usuários registrar, organizar e 
            compartilhar informações sobre seus medicamentos, exames, consultas e outros dados de saúde. O serviço visa facilitar 
            a comunicação entre pacientes e profissionais de saúde e ajudar no acompanhamento de rotinas de cuidado.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Isenção de Responsabilidade Médica</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
            <p className="font-bold text-yellow-800">O RotinaCare NÃO FORNECE ACONSELHAMENTO MÉDICO.</p>
          </div>
          <p>
            O conteúdo e as funcionalidades disponíveis no aplicativo, como informações sobre medicamentos, lembretes e artigos, 
            são fornecidos apenas para fins informativos e de gerenciamento pessoal. O Serviço não substitui, em hipótese alguma, 
            o julgamento clínico, o diagnóstico, o tratamento ou o aconselhamento de um profissional de saúde qualificado.
          </p>
          <p className="font-semibold">
            Sempre procure o conselho de seu médico ou outro profissional de saúde qualificado para quaisquer perguntas que você 
            possa ter sobre uma condição médica. Nunca desconsidere o conselho médico profissional ou demore a procurá-lo por 
            causa de algo que você leu ou utilizou no RotinaCare.
          </p>
          <p className="font-semibold text-red-600">
            Em caso de emergência médica, ligue para o serviço de emergência local imediatamente.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Contas de Usuário e Segurança</h2>
          <ul>
            <li><strong>Cadastro:</strong> Para usar o Serviço, você deve criar uma conta, fornecendo informações precisas e completas. Você é responsável por manter a precisão dessas informações.</li>
            <li><strong>Segurança da Senha:</strong> Você é o único responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorram em sua conta. Notifique-nos imediatamente sobre qualquer uso não autorizado de sua conta.</li>
            <li><strong>Tipos de Conta:</strong> Oferecemos diferentes tipos de contas (Paciente, Profissional, Administrador), cada uma com diferentes níveis de acesso e funcionalidades.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Uso Aceitável</h2>
          <p>Você concorda em não usar o Serviço para:</p>
          <ul>
            <li>Violar qualquer lei ou regulamento local, estadual, nacional ou internacional.</li>
            <li>Inserir informações falsas, imprecisas ou enganosas.</li>
            <li>Tentar obter acesso não autorizado aos nossos sistemas ou a contas de outros usuários.</li>
            <li>Transmitir vírus, malware ou qualquer outro código de natureza destrutiva.</li>
            <li>Infringir os direitos de propriedade intelectual de terceiros ou do RotinaCare.</li>
            <li>Usar o Serviço para qualquer finalidade comercial não autorizada.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo, design, software, código, marcas registradas e outros materiais que compõem o Serviço são de 
            propriedade exclusiva do RotinaCare e protegidos por leis de propriedade intelectual. Você não tem permissão para 
            copiar, modificar, distribuir, vender ou alugar qualquer parte do nosso Serviço ou software, nem fazer engenharia 
            reversa ou tentar extrair o código-fonte.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Privacidade e Dados Pessoais</h2>
          <p>
            Nossa <a href="/privacy" className="text-indigo-600 hover:underline font-semibold">Política de Privacidade</a> descreve 
            como coletamos, usamos e protegemos seus dados pessoais. Ao usar o RotinaCare, você concorda com as práticas descritas 
            em nossa Política de Privacidade, que é parte integrante destes Termos.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Limitação de Responsabilidade</h2>
          <p>
            O Serviço é fornecido "COMO ESTÁ" e "CONFORME DISPONÍVEL", sem garantias de qualquer tipo. Na extensão máxima 
            permitida pela lei, o RotinaCare, seus diretores e funcionários isentam-se de qualquer responsabilidade por:
          </p>
          <ul>
            <li>Quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou da incapacidade de usar o Serviço.</li>
            <li>Erros, imprecisões ou omissões no conteúdo do aplicativo.</li>
            <li>Qualquer acesso não autorizado ou uso de nossos servidores seguros e/ou qualquer informação pessoal armazenada neles.</li>
            <li>A conduta de qualquer outro usuário do Serviço.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Rescisão</h2>
          <p>
            Nós nos reservamos o direito de suspender ou rescindir seu acesso ao Serviço, a nosso exclusivo critério, sem aviso 
            prévio e por qualquer motivo, incluindo, mas não se limitando a, violação destes Termos.
          </p>
          <p>
            Você pode encerrar sua conta a qualquer momento, entrando em contato com nosso suporte.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Alterações nos Termos</h2>
          <p>
            Podemos modificar estes Termos a qualquer momento. Se fizermos alterações, publicaremos os Termos revisados no 
            aplicativo e atualizaremos a data da "Última atualização". O uso continuado do Serviço após a data de vigência dos 
            Termos revisados constitui sua aceitação das alterações.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">11. Lei Aplicável e Jurisdição</h2>
          <p>
            Estes Termos serão regidos e interpretados de acordo com as leis da República Federativa do Brasil. Você concorda 
            que qualquer ação legal ou processo decorrente ou relacionado a estes Termos será resolvido exclusivamente nos 
            tribunais da comarca de São Paulo, SP, Brasil.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">12. Contato</h2>
          <p>Se você tiver alguma dúvida sobre estes Termos de Serviço, entre em contato conosco:</p>
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
