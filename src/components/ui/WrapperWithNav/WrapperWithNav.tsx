import styles from "./WrapperWithNav.module.css";
import clsx from "clsx";

interface WrapperWithNavProps {
	title: string;
	mainClassName?: string;
	navClassName?: string;
	navRender?: () => JSX.Element;
	mainRender: () => JSX.Element;
}

export const WrapperWithNav = ({
	title,
	navRender,
	mainRender,
	mainClassName,
	navClassName
}: WrapperWithNavProps) => (
	<section>
		<div className="fix-wrapper">
			<h1>{title}</h1>
			<div className={styles.wrapper}>
				{navRender && (
					<div className={navClassName}>
						<nav className={styles.nav}>{navRender()}</nav>
					</div>
				)}
				<div className={clsx(mainClassName, styles.content)}>
					{mainRender()}
				</div>
			</div>
		</div>
	</section>
);
