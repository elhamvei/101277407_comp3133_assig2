import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';

const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            userId
            token
            tokenExpiration
        }
    }
`;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private tokenSubject = new BehaviorSubject<string | null>(null);
    token$ = this.tokenSubject.asObservable();


    constructor(private apollo: Apollo) { }

    async login(username: string, password: string): Promise<void> {
        const result = await this.apollo
            .mutate<{ login: { token: string } }>({
                mutation: LOGIN_MUTATION,
                variables: { username, password },
            })
            .toPromise();
        if (result) {
            console.log({ result });
            const token = result.data?.login.token;
            if (token) {
                localStorage.setItem('authToken', token);
                this.tokenSubject.next(token);
                return;
            }
        }

        throw new Error('Login failed');
    }

    logout(): void {
        localStorage.removeItem('authToken');
        this.tokenSubject.next(null);
    }

    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

}


