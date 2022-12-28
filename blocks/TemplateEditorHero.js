export default function TemplateEditorHero(props) {
  const {title, subtitle} = props.block;
  const {Section, Container, Button, Link} = props.ui;
  // console.log('props', props.ui);
  // const Section = KlarComponents.Section;
  // const Container = KlarComponents.Container;
  // const Button = KlarComponents.Button;
  // const Link = KlarLink;
  // console.log(KlarComponents);
  return (
    <Section className="bg-slate-900 text-on-background">
      <Container>
        <div className="text-center text-inverse-on-background mx-auto max-w-3xl px:4 sm:px-16 pb-32 pt-20 sm:pt-40 sm:pb-48">
          <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">{title}</h1>
          <p className="mt-6 text-lg leading-8 sm:text-center">{subtitle}</p>
          <div className="mt-8 flex gap-x-4 sm:justify-center">
            <Link className="bg-primary text-on-primary inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 shadow-sm hover:bg-primary-dark" to="/sida-1">Sida 1</Link>
            <a href="#" className="bg-primary text-on-primary inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 shadow-sm hover:bg-primary-dark">Learn more <span class="text-on-primary" aria-hidden="true">→</span></a>
            <a href="#" className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-neutral-200 ring-1 ring-gray-200/10 hover:ring-gray-200/20">Live demo <span class="text-neutral-400" aria-hidden="true">→</span></a>
          </div>
        </div>
      </Container>
    </Section>
  );
}