import "./AnimatedLoader.scss";
import { AnimatedLoaderProps } from './interfaces'
function AnimatedLoader({ variant = "lg" }: AnimatedLoaderProps) {
    return (
        <div className={`${variant === 'lg' ? "loader-64" : "loader-32"}`}>
        </div>
    );
}

export { AnimatedLoader };
