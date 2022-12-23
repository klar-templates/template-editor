// const Link = ReactLink;
// console.log(window.KlarReactLink)

export default function Hero() {
  return (
    <div className="section bg-slate-900 text-on-background">
      <div className="container-auto"> 
        <div className="text-center text-inverse-on-background mx-auto max-w-3xl px:4 sm:px-16 pb-32 pt-20 sm:pt-40 sm:pb-48">
          <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">Data to enrich your online business</h1>
          <p className="mt-6 text-lg leading-8 sm:text-center">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
          <div className="mt-8 flex gap-x-4 sm:justify-center">
            {/* <Link to="/sida-1">Sida 1</Link> */}
            <a href="#" className="bg-primary text-on-primary inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 shadow-sm hover:bg-primary-dark">Learn more <span class="text-on-primary" aria-hidden="true">→</span></a>
            <a href="#" className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-neutral-200 ring-1 ring-gray-200/10 hover:ring-gray-200/20">Live demo <span class="text-neutral-400" aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </div>
  );
}