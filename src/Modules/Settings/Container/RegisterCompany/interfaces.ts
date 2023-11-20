export interface RegisterAdminProps {
    loading?: boolean
    params: any
    onParams: (params: any) => void;
    onSubmit: () => void
    onBackPress: () => void
}