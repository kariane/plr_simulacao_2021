function renderData() {
	const cargo = document.getElementById('cargo');
	const area = document.getElementById('area');
	const time = +document.getElementById('360time').value;
	const gestor = +document.getElementById('360gestor').value;
	const salario = +document.getElementById('salario').value;
	const discricionario = +document.getElementById('discricionario').value;
	const calibragem = +document.getElementById('calibragem').value;
	const diasTrabalhados = +document.getElementById('dtrabalhados').value;
	const resultado = document.getElementById('resultado');

	const indexCargo = cargo.options.selectedIndex;
	const valorCargo = cargo.options[indexCargo].value;

	const indexArea = area.options.selectedIndex;
	const valorArea = area.options[indexArea].value;

	let target = salario * valorCargo;

	const vfinal =
		calibragem +
		PLR_final_discricionario(target, discricionario) +
		PLR_360_gestor(target, gestor) +
		PLR_360_time(target, time) +
		PLR_Meta_area(target, valorArea) +
		PLR_base_BP(target)

	const template = `
		<ul style="color: #5c5c5c">Salário
			<li>${salario}</li>
		</ul>
		<ul style="color: #5c5c5c">Multiplicador
			<li>${valorCargo}</li>
		</ul>
		<ul style="color: #5c5c5c">Valor do target
		<li>${target}</li>
		</ul>
		<ul style="color: #5c5c5c"> Porcentagem de atingimento Meta área
			<li>${valorArea}</li>
		</ul>
		<ul style="color: #5c5c5c">Quantidade de dias trabalhados
			<li>${diasTrabalhados}</li>
		</ul>
		<ul style="color: #5c5c5c">Valor do PLR com base no BP
			<li>${PLR_base_BP(target).toFixed(2)}</li>
		</ul>
		<ul style="color: #5c5c5c">Valor PLR com Meta área
			<li>${PLR_Meta_area(target, valorArea)}</li>
		</ul>
		<ul style="color: #5c5c5c">Valor do PLR com base na 360 do time
			<li>${PLR_360_time(target, time)}</li>
		</ul>
		<ul style="color: #5c5c5c">Valor do PLR com base na 360 do gestor
			<li>${PLR_360_gestor(target, gestor)}</li>
		</ul>
		<ul style="color: #5c5c5c">Valor final do discricionario
			<li>${PLR_final_discricionario(target, discricionario)}</li>
		</ul>
		<ul style="color: #5c5c5c"><strong>Resultado</strong>
			<li>${(vfinal / 365 * diasTrabalhados).toFixed(2)}</li>
		</ul>
	`;

	resultado.innerHTML = template;
}

const PLR_base_BP = (target) => {
	const porcentqueoBPrep = 0.2;
	const atingimento_do_BP = 0.9972;
	const valor_BPrep = target * porcentqueoBPrep;

	return valor_BPrep * atingimento_do_BP;
};

const PLR_Meta_area = (target, area) => {
	const totalquerepMetaArea = 0.3;
	const valorqueoBPrepMetaArea = target * totalquerepMetaArea;

	return valorqueoBPrepMetaArea * (area / 100);
};

const PLR_360_time = (target, time) => {
	const porcent_time = 0.1;
	const valor_alvo_time = target * porcent_time;
	const resultante_notatime = time / 5;

	return valor_alvo_time * resultante_notatime;
};

const PLR_360_gestor = (target, gestor) => {
	const porcent_gestor = 0.15;
	const vagestor = target * porcent_gestor;
	const resultante_nota_gestor = gestor / 5;

	return vagestor * resultante_nota_gestor;
};

const PLR_final_discricionario = (target, discricionario) => {
	const porc_discri = 0.25;
	const vadiscri = target * porc_discri;

	return vadiscri * (discricionario / 100);
};