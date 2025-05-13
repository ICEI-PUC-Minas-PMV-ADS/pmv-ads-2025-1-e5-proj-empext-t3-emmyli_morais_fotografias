const Categoria = ({ categorias = [], categoriaSelecionada, setCategoriaSelecionada, setGaleriaAberta }) => {
  return (
    <div className="flex flex-wrap justify-center gap-1 sm:gap-3 mt-14 px-10 w-full max-w-5xl sm:max-w-5xl mx-auto text-center">
      {categorias.map((categoria, index) => (
        <button
          key={index}
          onClick={() => {
            setCategoriaSelecionada(categoria);
            setGaleriaAberta(null);
          }}
          className={`
            font-serif px-2 py-2 
            transition-all font-semibold 
            text-sm sm:text-base md:text-lg lg:text-2xl 
            ${categoriaSelecionada === categoria ? "text-[#c09b2d]" : "text-white"} 
            hover:text-[#c09b2d] 
          `}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
};


export default Categoria;

