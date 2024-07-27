import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, ApiUrlService, User, UserLogin, UserResponse   } from '@tx/core';


const mockUser: User = { bio: 'ooee', token: 'token', image: 'image', email: '', username: 'roki' };

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;
    let apiUrlService: jest.Mocked<ApiUrlService>;

    beforeEach(() => {
        const apiUrlServiceMock = {
            createApiUrl: jest.fn()
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthService,
                { provide: ApiUrlService, useValue: apiUrlServiceMock }
            ]
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
        apiUrlService = TestBed.inject(ApiUrlService) as jest.Mocked<ApiUrlService>;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make an HTTP POST request to the correct URL in login and update currentUser$', () => {

        const mockResponse: UserResponse = { user: mockUser };
        const credentials: UserLogin = { email: 'test@test.com', password: 'password' };
        apiUrlService.createApiUrl.mockReturnValue('http://localhost:3000/api/users/login');

        service.login(credentials).subscribe(response => {
            expect(response).toEqual(mockResponse);
            expect(service.currentUser$.value).toEqual(mockUser);
            expect(localStorage.getItem('token')).toBe(mockUser.token);
        });

        const req = httpMock.expectOne('http://localhost:3000/api/users/login');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ user: credentials });
        req.flush(mockResponse);
    });

    it('should clear currentUser$ and remove token from localStorage on logout', () => {
        localStorage.setItem('token', 'token');
        service.currentUser$.next(mockUser);

        service.logout();

        expect(service.currentUser$.value).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();
    });

    it('should make an HTTP GET request to the correct URL in fetchCurrentUserData and return user data', () => {

        apiUrlService.createApiUrl.mockReturnValue('http://localhost:3000/api/user');

        service.fetchCurrentUserData().subscribe(user => {
            expect(user).toEqual(mockUser);
        });

        const req = httpMock.expectOne('http://localhost:3000/api/user');
        expect(req.request.method).toBe('GET');
        req.flush(mockUser);
    });

    it('should return true if a token is present in localStorage', () => {
        localStorage.setItem('token', 'token');
        expect(service.isAuth()).toBe(true);
    });

    it('should return false if no token is present in localStorage', () => {
        localStorage.removeItem('token');
        expect(service.isAuth()).toBe(false);
    });
});
