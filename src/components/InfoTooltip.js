function InfoTooltip({
	isOpen,
	tooltipContent,
	onOpen: setIsInfoTooltipOpen,
	onClose: setTooltipContent
}) {

	const { title, src } = tooltipContent;

	function closeTooltip() {

		setTooltipContent({ title: '', src: '' });
		setIsInfoTooltipOpen(false);
	}

	return (

		<div className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}>

			<div className="popup__container">

				<div className="tooltip-container">

					<div className="tooltip form">

						<img src={src} alt={title} />

						<h2 className="title form__title tooltip__title">{title}</h2>

						<button
							onClick={closeTooltip}
							className="close-button"
							type="button">
						</button>

					</div>

				</div>

			</div>

		</div>
	)
}

export default InfoTooltip;