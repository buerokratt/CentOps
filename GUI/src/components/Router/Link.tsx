import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
  useParams,
} from 'react-router-dom';

type Param = string | number | undefined;
export interface LinkProps extends RouterLinkProps {
  to: string;
  params?: Record<string, Param>;
}

export function replaceLinkParams<
  T extends Record<string, Param>,
  K extends keyof T = keyof T,
>(url: string, params: Record<keyof T, T[K]>) {
  return url.replace(/:([a-zA-Z0-9_]+)\??/g, (key) => {
    key = key.replace(/^:|[?]$/g, '');
    return params[key]?.toString() ?? '';
  });
}

export const Link = ({ params: propsParams, to, ...props }: LinkProps) => {
  const routerParams = useParams();
  const params = { ...routerParams, ...propsParams };

  return <RouterLink to={replaceLinkParams(to, params)} {...props} />;
};
