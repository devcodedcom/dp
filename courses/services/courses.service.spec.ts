import { CoursesService } from "./courses.service";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { COURSES, findLessonsForCourse, LESSONS } from "../../../../server/db-data";
import { Course } from "../model/course";
import { HttpErrorResponse } from "@angular/common/http";

describe('CoursesService', () => {
  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;
  const courseId = 12;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService
      ]
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all courses', (done) => {
    coursesService.findAllCourses().subscribe(courses => {
      expect(courses).toBeTruthy();
      expect(courses.length).toBe(courseId);

      const course = courses.find(course => course.id == courseId);

      expect(course.titles.description).toBe('Angular Testing Course');
      done();
    });

    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toEqual('GET');
    req.flush({payload: Object.values(COURSES)});
  });

  it('should find a course by id', (done) => {
    coursesService.findCourseById(courseId).subscribe(course => {
      expect(course).toBeTruthy();
      expect(course.id).toBe(courseId);
      done();
    });

    const req = httpTestingController.expectOne(`/api/courses/${courseId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(COURSES[courseId]);
  });

  it('should save the course data', (done) => {
    const changes: Partial<Course> = {titles: {description: 'Testing Course'}};

    coursesService.saveCourse(courseId, changes)
      .subscribe(course => {
        expect(course.id).toBe(courseId);
        done();
      })

    const req = httpTestingController.expectOne(`/api/courses/${courseId}`);

    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.titles.description).toEqual(changes.titles.description);

    req.flush({
      ...COURSES[courseId],
      ...changes
    })
  });

  it('should give an error if save course fails', (done) => {
    const changes: Partial<Course> = {titles: {description: 'Testing Course'}};

    coursesService.saveCourse(courseId, changes)
      .subscribe({
        next: () => {
          fail('The save course operation should have failed');
          done();
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(500);
          done();
        }
      })

    const req = httpTestingController.expectOne(`/api/courses/${courseId}`);
    expect(req.request.method).toEqual('PUT');
    req.flush('Save course failed', {status: 500, statusText: 'Internal Server Error'})
  })

  it('it should find a list of lessons', (done) => {
    coursesService.findLessons(courseId)
      .subscribe(lessons => {
        expect(lessons).toBeTruthy();
        expect(lessons.length).toBe(10);
        done();
      });

    const req = httpTestingController.expectOne(req => req.url === '/api/lessons');

    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('courseId')).toEqual(`${courseId}`);
    expect(req.request.params.get('filter')).toEqual('');
    expect(req.request.params.get('sortOrder')).toEqual('asc');
    expect(req.request.params.get('pageNumber')).toEqual('0');
    expect(req.request.params.get('pageSize')).toEqual('3');

    req.flush({
      payload: findLessonsForCourse(courseId)
    })

  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
