import React, { useState, useEffect, useRef } from 'react';
import {
  Calculator,
  DollarSign,
  FileText,
  Settings,
  RefreshCcw,
  CheckCircle,
  Save,
  Table,
  Stethoscope,
  ArrowLeft,
  Home,
  Plus,
  Trash2,
  X,
  Wallet,
  CheckSquare,
  Square,
  Printer,
  Lock,
  FileSpreadsheet,
  Upload,
  AlertCircle,
  Copy,
} from 'lucide-react';

const RepasseMedicoApp = () => {
  // --- CARREGAMENTO DA BIBLIOTECA XLSX ---
  const [libLoaded, setLibLoaded] = useState(false);

  useEffect(() => {
    // Carrega a biblioteca SheetJS para ler arquivos XLS/XLSX via CDN
    const script = document.createElement('script');
    script.src =
      'https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js';
    script.async = true;
    script.onload = () => setLibLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // --- ESTADOS DE CONFIGURAÇÃO (TABELAS) ---
  const [tabelaConsultas, setTabelaConsultas] = useState([
    { convenio: 'PARTICULAR', valor: 160.0 },
    { convenio: 'CARTÃO RELACIONAMENTO', valor: 95.0 },
    { convenio: 'TABELA SOCIAL', valor: 95.0 },
    { convenio: 'AGENDADO', valor: 100.0 },
    { convenio: 'REFRAÇÃO', valor: 100.0 },
    { convenio: 'PAGÉ', valor: 90.0 },
    { convenio: 'PAGÉ ACUIDADE', valor: 50.0 },
    { convenio: 'AMREC', valor: 50.0 },
    { convenio: 'AMUREL', valor: 50.0 },
    { convenio: 'MAMPITUBA', valor: 90.0 },
    { convenio: 'MULTCLORO', valor: 95.0 },
    { convenio: 'MACROSUL', valor: 50.0 },
    { convenio: 'REDE SUL', valor: 90.0 },
    { convenio: 'SIND SAÚDE', valor: 90.0 },
    { convenio: 'BENDO', valor: 90.0 },
    { convenio: 'FORQUILHINHA', valor: 80.0 },
    { convenio: 'ANGELGRESS', valor: 90.0 },
    { convenio: 'CTA', valor: 90.0 },
    { convenio: 'CTA ACUIDADE', valor: 90.0 },
    { convenio: 'SOLUMED', valor: 90.0 },
    { convenio: 'GATO MIA', valor: 90.0 },
    { convenio: 'PANELAÇO', valor: 90.0 },
    { convenio: 'URBANO', valor: 90.0 },
    { convenio: 'ALLIANCE', valor: 90.0 },
    { convenio: 'EMPENHO MAMBITUPA METADE', valor: 90.0 },
    { convenio: 'SC SAUDE', valor: 0.0 },
    { convenio: 'FAMED', valor: 0.0 },
    { convenio: 'CABERGES', valor: 0.0 },
    { convenio: 'SAUDE SÃO JOSÉ', valor: 0.0 },
    { convenio: 'CASSI', valor: 0.0 },
    { convenio: 'GEAP', valor: 0.0 },
    { convenio: 'POSTAL SAUDE', valor: 0.0 },
  ]);

  const [tabelaExames, setTabelaExames] = useState([
    {
      nome: 'ANGIOFLUORESCEINOGRAFIA',
      padrao: 180.0,
      amrec: 145.0,
      amurel: 90.0,
    },
    { nome: 'CICLOFOTOCOAGULAÇÃO', padrao: 300.0, amrec: 240.0, amurel: 100.0 },
    { nome: 'CURVA TENSIONAL', padrao: 60.0, amrec: 60.0, amurel: 0.0 },
    { nome: 'DACRIOCISTOGRAFIA', padrao: 100.0, amrec: 100.0, amurel: 70.0 },
    { nome: 'EPILAÇÃO', padrao: 300.0, amrec: 240.0, amurel: 0.0 },
    { nome: 'FOTOCOAGULAÇÃO', padrao: 165.0, amrec: 130.0, amurel: 75.0 },
    { nome: 'FOTOTRABECULOPLASTIA', padrao: 165.0, amrec: 130.0, amurel: 75.0 },
    { nome: 'GONIOSCOPIA', padrao: 60.0, amrec: 60.0, amurel: 0.0 },
    { nome: 'MAPEAMENTO', padrao: 75.0, amrec: 75.0, amurel: 20.0 },
    { nome: 'MICROSCOPIA', padrao: 85.0, amrec: 70.0, amurel: 45.0 },
    { nome: 'OCT', padrao: 120.0, amrec: 95.0, amurel: 60.0 },
    { nome: 'PAQUIMETRIA', padrao: 80.0, amrec: 65.0, amurel: 12.0 },
    { nome: 'PENTACAM', padrao: 90.0, amrec: 70.0, amurel: 90.0 },
    { nome: 'RETINO', padrao: 90.0, amrec: 70.0, amurel: 70.0 },
    { nome: 'SLT', padrao: 165.0, amrec: 130.0, amurel: 75.0 },
    { nome: 'SOBRECARGA HIDRIDA', padrao: 75.0, amrec: 75.0, amurel: 0.0 },
    { nome: 'TESTE DE LENTE', padrao: 75.0, amrec: 75.0, amurel: 0.0 },
    { nome: 'TESTE ORTOPTICO', padrao: 75.0, amrec: 75.0, amurel: 0.0 },
    { nome: 'TONOMETRIA', padrao: 45.0, amrec: 45.0, amurel: 0.0 },
    { nome: 'TOPOGRAFIA', padrao: 90.0, amrec: 70.0, amurel: 0.0 },
    { nome: 'ULTRASSOM', padrao: 85.0, amrec: 70.0, amurel: 25.0 },
    { nome: 'VISÃO SUB-NORMAL', padrao: 60.0, amrec: 60.0, amurel: 0.0 },
    { nome: 'CAPSULOTOMIA YAG', padrao: 165.0, amrec: 130.0, amurel: 75.0 },
    { nome: 'IRIDECTOMIA', padrao: 165.0, amrec: 130.0, amurel: 75.0 },
    { nome: 'INJEÇÃO DE ANTI-VEGF', padrao: 0.0, amrec: 0.0, amurel: 0.0 },
    { nome: 'RETORNO', padrao: 0.0, amrec: 0.0, amurel: 0.0 },
  ]);

  // --- ESTADOS DE UI E NAVEGAÇÃO ---
  const [view, setView] = useState('home');
  const [previousView, setPreviousView] = useState('home');
  const [settingsTab, setSettingsTab] = useState('consultas');

  // Estado para Importação
  const [inputText, setInputText] = useState('');
  const [fileName, setFileName] = useState('');
  const [resultados, setResultados] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  // Estado para Cálculo Manual
  const [manualInput, setManualInput] = useState({
    procedimento: '',
    convenio: '',
    quantidade: 1,
  });
  const [manualLista, setManualLista] = useState([]);

  // Estado para Saída de Caixa (Payout)
  const [payoutState, setPayoutState] = useState({
    caixaTotal: 0,
    items: [],
    selectedIds: [],
  });

  // --- FUNÇÕES AUXILIARES ---
  const normalize = (str) => {
    return str
      ? str
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toUpperCase()
          .trim()
      : '';
  };

  const excelDateToJSDate = (serial) => {
    if (!serial) return '';
    if (
      typeof serial === 'string' &&
      (serial.includes('/') || serial.includes('-'))
    )
      return serial;
    const numero = parseFloat(serial);
    if (isNaN(numero) || numero < 10000) return serial;
    const utc_days = Math.floor(numero - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    const date_adj = new Date(
      date_info.getTime() + date_info.getTimezoneOffset() * 60000 + 12 * 3600000
    );
    return date_adj.toLocaleDateString('pt-BR');
  };

  const atualizarPrecoConsulta = (index, novoValor) => {
    const novaTabela = [...tabelaConsultas];
    novaTabela[index].valor = parseFloat(novoValor) || 0;
    setTabelaConsultas(novaTabela);
  };

  const atualizarPrecoExame = (index, campo, novoValor) => {
    const novaTabela = [...tabelaExames];
    novaTabela[index][campo] = parseFloat(novoValor) || 0;
    setTabelaExames(novaTabela);
  };

  // --- LÓGICA DE CÁLCULO ---
  const calcularItem = (nomeProcedimento, nomeConvenio, quantidade) => {
    const procNorm = normalize(nomeProcedimento);
    const convNorm = normalize(nomeConvenio);
    let valorUnitario = 0;
    let tipo = 'DESCONHECIDO';

    if (procNorm.includes('CONSULTA ELETIVA')) {
      tipo = 'CONSULTA';
      const regra = tabelaConsultas.find(
        (c) =>
          convNorm === normalize(c.convenio) ||
          convNorm.includes(normalize(c.convenio))
      );
      valorUnitario = regra ? regra.valor : 0;
    } else {
      const exame = tabelaExames.find((e) => {
        const partesNome = normalize(e.nome).split(' ');
        return (
          procNorm.includes(normalize(e.nome)) ||
          partesNome.every((p) => procNorm.includes(p))
        );
      });

      if (exame) {
        tipo = 'EXAME';
        if (convNorm.includes('AMREC')) {
          valorUnitario = exame.amrec;
        } else if (convNorm.includes('AMUREL')) {
          valorUnitario = exame.amurel;
        } else {
          valorUnitario = exame.padrao;
        }
      }
    }

    return {
      tipo,
      unitario: valorUnitario,
      total: valorUnitario * quantidade,
    };
  };

  // --- MANIPULADORES DE IMPORTAÇÃO ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);

    const reader = new FileReader();

    if (window.XLSX) {
      reader.onload = (evt) => {
        try {
          const data = new Uint8Array(evt.target.result);
          const workbook = window.XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const csvContent = window.XLSX.utils.sheet_to_csv(worksheet);
          setInputText(csvContent);
          processarTexto(csvContent);
          setShowNotification(true);
        } catch (error) {
          console.error('Erro ao ler arquivo Excel:', error);
          alert('Erro ao ler o arquivo Excel.');
        } finally {
          setIsProcessing(false);
          setTimeout(() => setShowNotification(false), 3000);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      reader.onload = (evt) => {
        const text = evt.target.result;
        setInputText(text);
        processarTexto(text);
        setIsProcessing(false);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      };
      reader.readAsText(file, 'windows-1252');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const processarTexto = (content = inputText) => {
    if (!content) return;
    const lines = content.split('\n');
    const itensProcessados = [];
    let totalGeral = 0;

    let detectedIndices = null;
    let currentContextProcedure = '';
    let headerOffset = 0;

    const conveniosOrdenados = [...tabelaConsultas].sort(
      (a, b) => b.convenio.length - a.convenio.length
    );

    lines.forEach((linha, index) => {
      let linhaLimpa = linha.trim();
      const linhaSemVirgulas = linhaLimpa.replace(/,/g, ' ').trim();

      if (
        linhaSemVirgulas.length > 5 &&
        !linhaSemVirgulas.includes('Data') &&
        !linhaSemVirgulas.includes('00:00')
      ) {
        const possivelTitulo = normalize(linhaSemVirgulas);
        if (
          !possivelTitulo.includes('CONVENIO') &&
          !possivelTitulo.includes('COD ATE')
        ) {
          const isExame = tabelaExames.some((e) =>
            possivelTitulo.includes(normalize(e.nome))
          );
          const isConsulta = possivelTitulo.includes('CONSULTA ELETIVA');
          if (isExame || isConsulta) {
            currentContextProcedure = linhaSemVirgulas.replace(/"/g, '').trim();
          }
        }
      }

      let colunas;
      if (linhaLimpa.includes('\t')) {
        colunas = linhaLimpa.split('\t');
      } else {
        colunas = linhaLimpa.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      }

      if (colunas.length < 5) return;

      const clean = (val) => (val ? val.replace(/^"|"$/g, '').trim() : '');

      let idxConvenio = -1;
      let idxProcedimento = -1;
      let idxData = 0;
      let idxQt = 3;

      const headers = colunas.map((c) => normalize(clean(c)));

      if (headers.includes('CONVENIO')) {
        const rawIdxData = headers.indexOf('DATA');
        const rawIdxConv = headers.indexOf('CONVENIO');
        const rawIdxProc = headers.indexOf('PROCEDIMENTO');
        const rawIdxQt = headers.includes('QT')
          ? headers.indexOf('QT')
          : headers.indexOf('QTD');

        headerOffset = rawIdxData > 0 ? rawIdxData : 0;

        detectedIndices = {
          conv: rawIdxConv,
          proc: rawIdxProc,
          qt: rawIdxQt,
          data: rawIdxData,
        };
        return;
      }

      if (detectedIndices) {
        idxConvenio = detectedIndices.conv - headerOffset;
        idxProcedimento = detectedIndices.proc - headerOffset;
        idxQt = detectedIndices.qt - headerOffset;
        idxData = detectedIndices.data - headerOffset;
      } else {
        colunas.forEach((col, i) => {
          const val = normalize(clean(col));
          const isConvenio = conveniosOrdenados.some(
            (c) => val === normalize(c.convenio)
          );
          if (isConvenio) idxConvenio = i;
        });

        if (idxConvenio !== -1) {
          idxQt = idxConvenio - 4;
          if (colunas.length > 10) idxProcedimento = 10;
        } else {
          idxConvenio = 7;
          idxProcedimento = 10;
          idxQt = 3;
          idxData = 0;
        }
      }

      if (idxConvenio < 0) idxConvenio = 7;
      if (idxQt < 0) idxQt = 3;
      if (idxData < 0) idxData = 0;

      const dataRaw = clean(colunas[idxData]);
      const qtdRaw = clean(colunas[idxQt]);
      const convenioRaw = clean(colunas[idxConvenio]);

      let procedimentoRaw = '';
      if (idxProcedimento >= 0 && idxProcedimento < colunas.length) {
        procedimentoRaw = clean(colunas[idxProcedimento]);
      }

      if (!procedimentoRaw || procedimentoRaw.length < 3) {
        procedimentoRaw = currentContextProcedure;
      }

      const qtd = parseFloat(qtdRaw) || 1;
      const convenioNormalizado = normalize(convenioRaw);
      const procedimentoNormalizado = normalize(procedimentoRaw);

      if (!convenioNormalizado) return;

      let convenioFinal = 'DESCONHECIDO';
      let convMatch = conveniosOrdenados.find(
        (c) => convenioNormalizado === normalize(c.convenio)
      );

      if (convMatch) {
        convenioFinal = convMatch.convenio;
      } else {
        convMatch = conveniosOrdenados.find((c) =>
          convenioNormalizado.includes(normalize(c.convenio))
        );
        if (convMatch) convenioFinal = convMatch.convenio;
        else if (convenioRaw.length > 2) convenioFinal = convenioRaw;
        else return;
      }

      let procedimentoNomeInterno = null;
      if (procedimentoNormalizado.includes('CONSULTA ELETIVA')) {
        procedimentoNomeInterno = 'CONSULTA ELETIVA';
      } else {
        for (const exame of tabelaExames) {
          const partesNome = normalize(exame.nome).split(' ');
          const contemNome = partesNome.every((parte) =>
            procedimentoNormalizado.includes(parte)
          );
          if (
            procedimentoNormalizado.includes(normalize(exame.nome)) ||
            contemNome
          ) {
            procedimentoNomeInterno = exame.nome;
            break;
          }
        }
      }

      if (procedimentoNomeInterno) {
        const calculo = calcularItem(
          procedimentoNomeInterno,
          convenioFinal,
          qtd
        );
        const dataFormatada = excelDateToJSDate(dataRaw);

        itensProcessados.push({
          id: index,
          data: dataFormatada,
          qtd,
          convenio: convenioFinal,
          tipo: calculo.tipo,
          procedimento: procedimentoNomeInterno,
          descricaoOriginal: procedimentoRaw,
          valorUnitario: calculo.unitario,
          valorTotal: calculo.total,
        });
        totalGeral += calculo.total;
      }
    });

    const resumo = itensProcessados.reduce((acc, item) => {
      const chave = item.convenio;
      if (!acc[chave]) acc[chave] = { qtd: 0, total: 0 };
      acc[chave].qtd += item.qtd;
      acc[chave].total += item.valorTotal;
      return acc;
    }, {});

    setResultados({ itens: itensProcessados, resumo, total: totalGeral });
  };

  // --- MANIPULADORES MANUAL ---
  const adicionarItemManual = () => {
    const { procedimento, convenio, quantidade } = manualInput;
    if (!procedimento || !convenio) return;

    const resultado = calcularItem(
      procedimento,
      convenio,
      parseFloat(quantidade)
    );
    const novoItem = {
      id: Date.now(),
      procedimento,
      convenio,
      qtd: parseFloat(quantidade),
      tipo: resultado.tipo,
      valorUnitario: resultado.unitario,
      valorTotal: resultado.total,
    };
    setManualLista([...manualLista, novoItem]);
    setManualInput((prev) => ({ ...prev, procedimento: '', quantidade: 1 }));
  };

  const removerItemManual = (id) => {
    setManualLista(manualLista.filter((item) => item.id !== id));
  };

  const calcularTotalManual = () =>
    manualLista.reduce((acc, item) => acc + item.valorTotal, 0);

  // --- LÓGICA DE PAYOUT ---
  const iniciarPagamento = (listaItens, origem) => {
    setPreviousView(origem);
    const todosIds = listaItens.map((i) => i.id);
    setPayoutState({
      caixaTotal: 0,
      items: listaItens,
      selectedIds: [],
    });
    setView('payout');
  };

  const sugerirPagamento = (caixaDisponivel) => {
    const caixa = parseFloat(caixaDisponivel) || 0;
    let acumulado = 0;
    const idsSugeridos = [];

    for (const item of payoutState.items) {
      if (acumulado + item.valorTotal <= caixa) {
        acumulado += item.valorTotal;
        idsSugeridos.push(item.id);
      }
    }

    setPayoutState((prev) => ({
      ...prev,
      caixaTotal: caixa,
      selectedIds: idsSugeridos,
    }));
  };

  const toggleItemPagamento = (id) => {
    setPayoutState((prev) => {
      const isSelected = prev.selectedIds.includes(id);
      const newSelectedIds = isSelected
        ? prev.selectedIds.filter((itemId) => itemId !== id)
        : [...prev.selectedIds, id];

      return { ...prev, selectedIds: newSelectedIds };
    });
  };

  const gerarRelatorioImpressao = () => {
    setView('report');
  };

  const imprimirAgora = () => {
    window.print();
  };

  // --- UI COMPONENTS ---
  const Header = () => (
    <header className="bg-blue-700 text-white p-4 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setView('home')}
      >
        <Calculator className="w-6 h-6" />
        <h1 className="text-xl font-bold">Calculadora de Repasse Médico</h1>
      </div>
      <div className="flex gap-2 bg-blue-800 p-1 rounded-lg">
        {view !== 'home' && (
          <button
            onClick={() => setView('home')}
            className="px-4 py-2 rounded-md flex items-center gap-2 transition text-sm font-bold text-blue-100 hover:text-white hover:bg-blue-700"
          >
            <Home className="w-4 h-4" /> Início
          </button>
        )}
        <button
          onClick={() => setView('settings')}
          className={`px-4 py-2 rounded-md flex items-center gap-2 transition text-sm font-bold ${
            view === 'settings'
              ? 'bg-white text-blue-800 shadow-sm'
              : 'text-blue-100 hover:text-white hover:bg-blue-700'
          }`}
        >
          <Settings className="w-4 h-4" /> Tabelas de Preço
        </button>
      </div>
    </header>
  );

  // --- RENDER VIEWS ---
  const renderHome = () => (
    <div className="flex flex-col items-center justify-center h-full p-6 animate-fade-in print:hidden">
      <h2 className="text-3xl font-bold text-slate-700 mb-8 text-center">
        Como deseja calcular o repasse?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <button
          onClick={() => setView('import')}
          className="group relative bg-white p-8 rounded-2xl shadow-md border-2 border-slate-100 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4 text-center"
        >
          <div className="bg-blue-50 p-6 rounded-full group-hover:bg-blue-100 transition-colors">
            <FileSpreadsheet className="w-12 h-12 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Importar Relatório XLS/CSV
            </h3>
            <p className="text-slate-500 text-sm">
              Carregue o arquivo gerado pelo sistema para cálculo automático.
            </p>
          </div>
        </button>

        <button
          onClick={() => setView('manual')}
          className="group relative bg-white p-8 rounded-2xl shadow-md border-2 border-slate-100 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4 text-center"
        >
          <div className="bg-blue-50 p-6 rounded-full group-hover:bg-blue-100 transition-colors">
            <Calculator className="w-12 h-12 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Calculadora Manual
            </h3>
            <p className="text-slate-500 text-sm">
              Insira manualmente procedimento por procedimento e veja o total
              somado.
            </p>
          </div>
        </button>
      </div>
    </div>
  );

  const renderImport = () => (
    <div className="h-full flex flex-col print:hidden">
      <div className="mb-4">
        <button
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition text-sm font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para o Início
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
        <div className="flex-1 lg:max-w-md flex flex-col gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-full relative">
            <h2 className="font-bold text-lg mb-2 flex items-center gap-2 text-slate-700">
              <FileSpreadsheet className="w-5 h-5 text-blue-600" />
              Importar Arquivo
            </h2>

            <p className="text-xs text-slate-500 mb-6">
              Carregue o arquivo{' '}
              <span className="font-bold text-slate-700">.xls</span> ou{' '}
              <span className="font-bold text-slate-700">.csv</span> gerado pelo
              sistema.
            </p>

            {/* File Upload Zone */}
            <input
              type="file"
              accept=".csv, .xls, .txt"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />

            <div
              onClick={triggerFileInput}
              className="flex-1 border-2 border-dashed border-blue-200 bg-blue-50 rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-blue-100 transition group"
            >
              <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition">
                {isProcessing ? (
                  <RefreshCcw className="w-8 h-8 text-blue-500 animate-spin" />
                ) : (
                  <Upload className="w-8 h-8 text-blue-500" />
                )}
              </div>
              <span className="font-bold text-blue-700 mb-1">
                {isProcessing
                  ? 'Processando...'
                  : 'Clique para enviar o arquivo'}
              </span>
              <span className="text-xs text-slate-400">
                Suporta formato CSV/XLS do RealClinic
              </span>
            </div>

            {fileName && (
              <div className="mt-4 bg-slate-100 p-3 rounded-lg flex items-center gap-2 text-sm text-slate-700 border border-slate-200">
                <FileSpreadsheet className="w-4 h-4 text-green-600" />
                <span className="truncate flex-1 font-medium">{fileName}</span>
                <button
                  onClick={() => {
                    setFileName('');
                    setInputText('');
                    setResultados(null);
                  }}
                  className="text-slate-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="mt-6 border-t border-slate-200 pt-4">
              <p className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                <Copy className="w-3 h-3" /> Ou cole o conteúdo aqui (Manual)
              </p>
              <textarea
                className="w-full h-32 p-3 border border-slate-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                placeholder="Se o upload falhar, abra o arquivo no Excel/Bloco de Notas, copie tudo e cole aqui..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
              <button
                onClick={() => processarTexto()}
                disabled={!inputText}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-2 rounded-lg font-bold shadow-sm transition flex justify-center items-center gap-2 text-sm"
              >
                <RefreshCcw className="w-4 h-4" /> Processar Texto Colado
              </button>
            </div>

            {showNotification && (
              <div className="mt-4 bg-green-100 text-green-700 text-xs px-3 py-3 rounded flex items-center gap-2 animate-pulse font-bold">
                <CheckCircle className="w-4 h-4" /> Arquivo processado com
                sucesso!
              </div>
            )}

            {resultados &&
              resultados.itens.length === 0 &&
              (fileName || inputText) &&
              !isProcessing && (
                <div className="mt-4 bg-red-50 text-red-600 text-xs px-3 py-3 rounded flex items-center gap-2 font-bold border border-red-100">
                  <AlertCircle className="w-4 h-4" /> Nenhum item válido
                  encontrado. Tente copiar e colar o texto.
                </div>
              )}
          </div>
        </div>

        <div className="flex-[2] overflow-hidden flex flex-col">
          {resultados && resultados.itens.length > 0 ? (
            <div className="flex flex-col gap-4 h-full animate-fade-in overflow-auto pr-2">
              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 opacity-80 mb-1">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">
                      Total a Pagar
                    </span>
                  </div>
                  <div className="text-4xl font-extrabold tracking-tight">
                    {resultados.total.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </div>
                </div>
                <button
                  onClick={() => iniciarPagamento(resultados.itens, 'import')}
                  className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg transition"
                >
                  <Wallet className="w-5 h-5" /> Planejar Pagamento
                </button>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-700 mb-3 text-sm uppercase flex items-center gap-2">
                  <Table className="w-4 h-4" /> Resumo por Convênio
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(resultados.resumo).map(([nome, dados]) => (
                    <div
                      key={nome}
                      className="bg-slate-50 p-3 rounded border border-slate-100 flex justify-between items-center"
                    >
                      <div>
                        <div
                          className="text-xs font-bold text-slate-500 truncate w-24 md:w-32"
                          title={nome}
                        >
                          {nome}
                        </div>
                        <div className="text-xs text-slate-400">
                          {dados.qtd} proc.
                        </div>
                      </div>
                      <div className="font-bold text-slate-700 text-sm">
                        {dados.total.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <h3 className="font-bold text-slate-700 text-sm">
                    Extrato Detalhado
                  </h3>
                </div>
                <div className="overflow-auto flex-1">
                  <table className="w-full text-xs text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0">
                      <tr>
                        <th className="px-4 py-2">Data</th>
                        <th className="px-4 py-2">Tipo</th>
                        <th className="px-4 py-2">Convênio</th>
                        <th className="px-4 py-2">Procedimento</th>
                        <th className="px-4 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultados.itens.map((item, idx) => (
                        <tr
                          key={idx}
                          className="bg-white border-b border-slate-100 hover:bg-slate-50 transition"
                        >
                          <td className="px-4 py-2 font-mono text-slate-500 whitespace-nowrap">
                            {item.data}
                          </td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                item.tipo === 'CONSULTA'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {item.tipo}
                            </span>
                          </td>
                          <td className="px-4 py-2 font-medium text-slate-700">
                            {item.convenio}
                          </td>
                          <td className="px-4 py-2 text-slate-600">
                            {item.procedimento}
                          </td>
                          <td className="px-4 py-2 text-right font-bold text-slate-700">
                            {item.valorTotal.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-12">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Stethoscope className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-lg font-semibold text-slate-500">
                Aguardando Arquivo
              </h3>
              <p className="text-sm max-w-xs text-center mt-2 opacity-70">
                Faça o upload do arquivo para visualizar o relatório.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderManual = () => {
    const totalManual = calcularTotalManual();

    return (
      <div className="max-w-4xl mx-auto w-full animate-fade-in pb-10 print:hidden">
        <div className="mb-4">
          <button
            onClick={() => setView('home')}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para o Início
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-blue-600 p-4 text-white">
                <h2 className="font-bold flex items-center gap-2">
                  <Plus className="w-5 h-5" /> Adicionar Item
                </h2>
              </div>

              <div className="p-4 flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Procedimento
                  </label>
                  <input
                    list="procedimentos-list"
                    type="text"
                    className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium text-sm"
                    placeholder="Digite para buscar..."
                    value={manualInput.procedimento}
                    onChange={(e) =>
                      setManualInput({
                        ...manualInput,
                        procedimento: e.target.value,
                      })
                    }
                  />
                  <datalist id="procedimentos-list">
                    <option value="CONSULTA ELETIVA" />
                    {tabelaExames.map((ex, i) => (
                      <option key={i} value={ex.nome} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Convênio
                  </label>
                  <select
                    className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm"
                    value={manualInput.convenio}
                    onChange={(e) =>
                      setManualInput({
                        ...manualInput,
                        convenio: e.target.value,
                      })
                    }
                  >
                    <option value="">Selecione...</option>
                    {tabelaConsultas.map((c, i) => (
                      <option key={i} value={c.convenio}>
                        {c.convenio}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-bold"
                    value={manualInput.quantidade}
                    onChange={(e) =>
                      setManualInput({
                        ...manualInput,
                        quantidade: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  onClick={adicionarItemManual}
                  disabled={!manualInput.procedimento || !manualInput.convenio}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-2 rounded font-bold shadow-sm transition flex justify-center items-center gap-2 mt-2"
                >
                  <Plus className="w-4 h-4" /> Adicionar
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-6 rounded-xl shadow-lg">
              <div className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">
                Total do Repasse
              </div>
              <div className="text-3xl font-extrabold">
                {totalManual.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </div>
              {manualLista.length > 0 && (
                <button
                  onClick={() => iniciarPagamento(manualLista, 'manual')}
                  className="mt-4 w-full bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-2 rounded-lg flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <Wallet className="w-4 h-4" /> Planejar Pagamento
                </button>
              )}
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[500px]">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" /> Lista de
                Procedimentos
              </h3>
              {manualLista.length > 0 && (
                <button
                  onClick={() => setManualLista([])}
                  className="text-xs text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded hover:bg-red-50 transition"
                >
                  Limpar Lista
                </button>
              )}
            </div>
            <div className="flex-1 overflow-auto p-2">
              {manualLista.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-300">
                  <Plus className="w-12 h-12 mb-2 opacity-50" />
                  <p className="text-sm font-medium">Sua lista está vazia</p>
                  <p className="text-xs">
                    Adicione itens usando o formulário ao lado.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {manualLista.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-slate-50 transition group animate-fade-in"
                    >
                      <div className="flex-1 min-w-0 mr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              item.tipo === 'CONSULTA'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {item.tipo === 'CONSULTA' ? 'CONS' : 'EXAME'}
                          </span>
                          <span className="text-xs font-bold text-slate-500 truncate">
                            {item.convenio}
                          </span>
                        </div>
                        <div
                          className="text-sm font-bold text-slate-700 truncate"
                          title={item.procedimento}
                        >
                          {item.procedimento}
                        </div>
                        <div className="text-xs text-slate-400">
                          {item.qtd}x{' '}
                          {item.valorUnitario.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-bold text-slate-700">
                          {item.valorTotal.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </div>
                        <button
                          onClick={() => removerItemManual(item.id)}
                          className="text-slate-300 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPayout = () => {
    const totalSelecionado = payoutState.items
      .filter((item) => payoutState.selectedIds.includes(item.id))
      .reduce((acc, item) => acc + item.valorTotal, 0);

    const saldoRestante = payoutState.caixaTotal - totalSelecionado;
    const isNegative = saldoRestante < 0;

    return (
      <div className="max-w-4xl mx-auto w-full animate-fade-in pb-10 flex flex-col h-full print:hidden">
        <div className="mb-4">
          <button
            onClick={() => setView(previousView)}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para Resultados
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col h-full">
          {/* Header do Caixa */}
          <div className="bg-slate-800 p-6 text-white shadow-md z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="font-bold text-xl flex items-center gap-2 text-yellow-400">
                  <Wallet className="w-6 h-6" /> Gestão de Saída de Caixa
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Defina seu caixa e veja o que pode pagar.
                </p>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <div className="flex items-center gap-3 bg-slate-700 p-2 rounded-lg border border-slate-600">
                  <label className="text-xs font-bold uppercase text-slate-300">
                    Total em Caixa R$:
                  </label>
                  <input
                    type="number"
                    className="bg-slate-900 text-white font-bold text-lg p-2 w-32 rounded border border-slate-600 focus:border-yellow-400 focus:outline-none text-right"
                    placeholder="0,00"
                    value={payoutState.caixaTotal || ''}
                    onChange={(e) => sugerirPagamento(e.target.value)}
                  />
                </div>

                <button
                  onClick={gerarRelatorioImpressao}
                  className="bg-green-600 hover:bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow transition"
                >
                  <CheckCircle className="w-4 h-4" /> Concluir e Gerar Relatório
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-700">
              <div className="text-center md:text-left">
                <div className="text-xs text-slate-400 uppercase">
                  Total a Pagar (Geral)
                </div>
                <div className="text-xl font-bold text-white">
                  {payoutState.items
                    .reduce((a, b) => a + b.valorTotal, 0)
                    .toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xs text-slate-400 uppercase">
                  Selecionado para Pagar
                </div>
                <div className="text-xl font-bold text-green-400">
                  {totalSelecionado.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xs text-slate-400 uppercase">
                  Saldo Restante
                </div>
                <div
                  className={`text-2xl font-extrabold ${
                    isNegative ? 'text-red-500' : 'text-blue-400'
                  }`}
                >
                  {saldoRestante.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Itens */}
          <div className="flex-1 overflow-auto p-4 bg-slate-50">
            <div className="space-y-2">
              {payoutState.items.map((item) => {
                const isSelected = payoutState.selectedIds.includes(item.id);
                const itemVal = item.valorTotal || 0;
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItemPagamento(item.id)}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition select-none ${
                      isSelected
                        ? 'bg-white border-green-500 shadow-sm ring-1 ring-green-500'
                        : 'bg-slate-100 border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition ${
                          isSelected
                            ? 'bg-green-500 border-green-500'
                            : 'bg-white border-slate-300'
                        }`}
                      >
                        {isSelected && (
                          <CheckSquare className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className={`text-[10px] font-bold px-1.5 rounded ${
                              item.tipo === 'CONSULTA'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}
                          >
                            {item.tipo === 'CONSULTA' ? 'CONS' : 'EXAME'}
                          </span>
                          <span className="text-xs font-bold text-slate-500 truncate">
                            {item.convenio}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-slate-700 truncate">
                          {item.procedimento}
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-slate-700 whitespace-nowrap ml-4">
                      {itemVal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-3 border-t border-slate-200 text-center text-xs text-slate-400">
            Clique nos itens para adicionar/remover manualmente.
          </div>
        </div>
      </div>
    );
  };

  const renderReport = () => {
    const pagos = payoutState.items.filter((item) =>
      payoutState.selectedIds.includes(item.id)
    );
    const pendentes = payoutState.items.filter(
      (item) => !payoutState.selectedIds.includes(item.id)
    );

    const totalPago = pagos.reduce((acc, item) => acc + item.valorTotal, 0);
    const totalPendente = pendentes.reduce(
      (acc, item) => acc + item.valorTotal,
      0
    );

    return (
      <div className="min-h-screen bg-slate-500 p-8 print:p-0 print:bg-white flex justify-center">
        {/* Controles de Impressão (Ocultos na Impressão) */}
        <div className="fixed top-4 left-4 z-50 print:hidden flex flex-col gap-2">
          <button
            onClick={() => setView('payout')}
            className="bg-white text-slate-700 font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>
        </div>
        <div className="fixed top-4 right-4 z-50 print:hidden">
          <button
            onClick={imprimirAgora}
            className="bg-blue-600 text-white font-bold px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-700 transition animate-bounce"
          >
            <Printer className="w-5 h-5" /> Imprimir / Salvar PDF
          </button>
        </div>

        {/* Folha A4 */}
        <div className="bg-white w-[210mm] min-h-[297mm] p-[15mm] shadow-2xl print:shadow-none print:w-full print:h-auto text-slate-900">
          {/* Cabeçalho Relatório */}
          <div className="border-b-2 border-slate-800 pb-4 mb-6">
            <h1 className="text-2xl font-bold uppercase text-slate-800">
              Resumo de Pagamento Médico
            </h1>
            <div className="flex justify-between items-end mt-2">
              <div className="text-sm text-slate-500">
                Data de Emissão: {new Date().toLocaleDateString()} às{' '}
                {new Date().toLocaleTimeString()}
              </div>
              <div className="text-right">
                <div className="text-xs uppercase font-bold text-slate-400">
                  Total Pago
                </div>
                <div className="text-2xl font-bold text-slate-800">
                  {totalPago.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Tabela de Pagos */}
          <div className="mb-8">
            <h3 className="font-bold text-lg bg-green-100 text-green-800 px-3 py-1 mb-2 border-l-4 border-green-600">
              ITENS PAGOS
            </h3>
            {pagos.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-2">Data</th>
                    <th className="text-left py-2">Procedimento</th>
                    <th className="text-left py-2">Convênio</th>
                    <th className="text-right py-2">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100">
                      <td className="py-2 font-mono text-slate-500 text-xs">
                        {item.data || '-'}
                      </td>
                      <td className="py-2">
                        <div className="font-bold">{item.procedimento}</div>
                        <div className="text-xs text-slate-400">
                          Qtd: {item.qtd}
                        </div>
                      </td>
                      <td className="py-2 text-xs uppercase font-bold text-slate-500">
                        {item.convenio}
                      </td>
                      <td className="py-2 text-right font-bold">
                        {item.valorTotal.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold">
                    <td
                      colSpan="3"
                      className="text-right py-3 px-2 uppercase text-xs"
                    >
                      Total Pago
                    </td>
                    <td className="text-right py-3 text-green-700">
                      {totalPago.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p className="text-slate-400 italic text-sm p-4 text-center border border-dashed border-slate-300 rounded">
                Nenhum item foi pago nesta remessa.
              </p>
            )}
          </div>

          {/* Tabela de Pendentes */}
          <div className="mb-8">
            <h3 className="font-bold text-lg bg-red-50 text-red-800 px-3 py-1 mb-2 border-l-4 border-red-400">
              PENDENTES / A PAGAR
            </h3>
            {pendentes.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-2">Data</th>
                    <th className="text-left py-2">Procedimento</th>
                    <th className="text-left py-2">Convênio</th>
                    <th className="text-right py-2">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {pendentes.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100">
                      <td className="py-2 font-mono text-slate-500 text-xs">
                        {item.data || '-'}
                      </td>
                      <td className="py-2">
                        <div className="font-bold">{item.procedimento}</div>
                        <div className="text-xs text-slate-400">
                          Qtd: {item.qtd}
                        </div>
                      </td>
                      <td className="py-2 text-xs uppercase font-bold text-slate-500">
                        {item.convenio}
                      </td>
                      <td className="py-2 text-right font-bold text-slate-400">
                        {item.valorTotal.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold">
                    <td
                      colSpan="3"
                      className="text-right py-3 px-2 uppercase text-xs"
                    >
                      Total Pendente
                    </td>
                    <td className="text-right py-3 text-red-600">
                      {totalPendente.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p className="text-slate-400 italic text-sm p-4 text-center border border-dashed border-slate-300 rounded">
                Tudo foi pago! Nada pendente.
              </p>
            )}
          </div>

          {/* Resumo Final */}
          <div className="mt-8 border-t-2 border-slate-800 pt-4 flex justify-between items-center">
            <div className="text-xs text-slate-400">
              Gerado via Calculadora de Repasse Médico
            </div>
            <div className="text-right">
              <div className="text-sm font-bold uppercase text-slate-500">
                Valor Total dos Procedimentos
              </div>
              <div className="text-xl font-bold text-slate-900">
                {(totalPago + totalPendente).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full md:h-auto animate-fade-in print:hidden">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-700">
          <Settings className="w-5 h-5 text-blue-600" /> Tabela de Preços
          (Apenas Leitura)
        </h2>
        <button
          onClick={() => setView('home')}
          className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
      </div>
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setSettingsTab('consultas')}
          className={`flex-1 py-3 text-sm font-bold border-b-2 transition ${
            settingsTab === 'consultas'
              ? 'border-blue-600 text-blue-600 bg-blue-50'
              : 'border-transparent text-slate-500 hover:bg-slate-50'
          }`}
        >
          Preço de Consultas
        </button>
        <button
          onClick={() => setSettingsTab('exames')}
          className={`flex-1 py-3 text-sm font-bold border-b-2 transition ${
            settingsTab === 'exames'
              ? 'border-blue-600 text-blue-600 bg-blue-50'
              : 'border-transparent text-slate-500 hover:bg-slate-50'
          }`}
        >
          Preço de Exames
        </button>
      </div>
      <div className="p-6 overflow-auto max-h-[70vh]">
        {settingsTab === 'consultas' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tabelaConsultas.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 opacity-80"
              >
                <div className="flex-1">
                  <label
                    className="text-xs font-bold text-slate-500 uppercase block mb-1 truncate"
                    title={item.convenio}
                  >
                    {item.convenio}
                  </label>
                  <div className="flex items-center bg-slate-100 border border-slate-300 rounded px-3 py-1.5">
                    <Lock className="w-3 h-3 text-slate-400 mr-2" />
                    <span className="text-slate-700 font-bold text-sm">
                      {item.valor.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-2 text-xs font-bold text-slate-500 uppercase px-2 mb-2">
              <div className="col-span-5 md:col-span-3">Exame</div>
              <div className="col-span-7 md:col-span-9 grid grid-cols-3 gap-2">
                <div className="text-center">Particular / Convênios</div>
                <div className="text-center text-blue-600">AMREC</div>
                <div className="text-center text-purple-600">AMUREL</div>
              </div>
            </div>
            {tabelaExames.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200"
              >
                <div
                  className="col-span-5 md:col-span-3 font-bold text-sm text-slate-700 truncate"
                  title={item.nome}
                >
                  {item.nome}
                </div>
                <div className="col-span-7 md:col-span-9 grid grid-cols-3 gap-2">
                  <div className="p-2 rounded bg-slate-100 border border-slate-200 text-center font-mono text-sm text-slate-600 font-bold">
                    {item.padrao.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </div>
                  <div className="p-2 rounded bg-blue-50 border border-blue-100 text-center font-mono text-sm text-blue-800 font-bold">
                    {item.amrec.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </div>
                  <div className="p-2 rounded bg-purple-50 border border-purple-100 text-center font-mono text-sm text-purple-800 font-bold">
                    {item.amurel.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-800">
      <Header />
      <main className="flex-1 overflow-auto p-4 md:p-6 print:p-0 print:overflow-visible">
        {view === 'home' && renderHome()}
        {view === 'import' && renderImport()}
        {view === 'manual' && renderManual()}
        {view === 'settings' && renderSettings()}
        {view === 'payout' && renderPayout()}
        {view === 'report' && renderReport()}
      </main>
    </div>
  );
};

function KpiCard({ title, value, subtitle }) {
  const styles = {
    card: {
      borderRadius: 16,
      padding: 18,
      background: "linear-gradient(135deg, #2d4cff 0%, #1f2fb0 100%)",
      boxShadow: "0 10px 24px rgba(0,0,0,.35)",
      color: "#fff",
      minHeight: 92,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    title: { fontSize: 12, letterSpacing: 0.6, fontWeight: 700, opacity: 0.9, textTransform: "uppercase" },
    value: { marginTop: 6, fontSize: 34, fontWeight: 800, lineHeight: 1.05 },
    subtitle: { marginTop: 6, fontSize: 12, opacity: 0.85 },
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}>{title}</div>
      <div style={styles.value}>{value}</div>
      {subtitle ? <div style={styles.subtitle}>{subtitle}</div> : null}
    </div>
  );
}

export default RepasseMedicoApp;

