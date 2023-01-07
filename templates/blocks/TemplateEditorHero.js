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
    <Section className="dark bg-slate-900">
      <Container>
        <div className="text-center mx-auto max-w-3xl px:4 sm:px-16 pb-32 pt-20 sm:pt-40 sm:pb-48 dark:text-neutral-50">
          <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">{title}</h1>
          <p className="mt-6 text-lg leading-8 sm:text-center text-neutral-700 dark:text-neutral-200">{subtitle}</p>
          <div className="mt-8 flex gap-x-4 sm:justify-center">
            <Link className="btn btn-filled-dark btn-lg" to="/sida-1">Learn more <span class="ml-1 leading-[1.312rem]" aria-hidden="true"> →</span></Link>
            <Link className="btn btn-outlined btn-lg" to="/kontakt">Live demo <span class="ml-1 leading-[1.312rem]" aria-hidden="true">→</span></Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}